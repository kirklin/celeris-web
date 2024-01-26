import type { RouteRecordRaw } from "vue-router";
import { cloneDeep, field, isString, logger } from "@celeris/utils";
import { EXCEPTION_COMPONENT, IFRAME, LAYOUT, getParentLayout } from "~/router/constant";

type DynamicPagesModules = Record<string, () => Promise<Recordable>>;

const layoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();
layoutMap.set("LAYOUT", LAYOUT);
layoutMap.set("IFRAME", IFRAME);

interface BackendRouteRecordRaw extends Omit<RouteRecordRaw, "component"> {
  component?: string | (() => Promise<Recordable>) | RouteRecordRaw | undefined;
}

/**
 * Asynchronously imports the route component
 * 异步导入路由组件
 * @param routes 路由配置项
 * @param dynamicPagesModules 动态路由模块
 */
function asyncImportRoute(routes: BackendRouteRecordRaw[] | RouteRecordRaw[], dynamicPagesModules: DynamicPagesModules = import.meta.glob<{ default: any }>("../../pages/**/*.{vue,tsx}")) {
  if (!routes) {
    return;
  }

  routes.forEach((item) => {
    if (!item.component && item.meta?.iframeLink) {
      item.component = "IFRAME" as const;
    }

    const { component, name } = item;
    const { children } = item;

    if (component && isString(component)) {
      const layoutFound = layoutMap.get(component.toUpperCase());
      if (layoutFound) {
        item.component = layoutFound;
      } else {
        if (dynamicPagesModules) {
          item.component = dynamicImport(dynamicPagesModules, component);
        }
      }
    } else if (name) {
      item.component = getParentLayout();
    }

    children && asyncImportRoute(children, dynamicPagesModules);
  });
}

/**
 * Dynamically imports the route component
 * 动态导入路由组件
 * @param dynamicPagesModules 动态路由模块
 * @param component 组件名称
 */
function dynamicImport(dynamicPagesModules: DynamicPagesModules, component: string) {
  const keys = Object.keys(dynamicPagesModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace("../../pages", "");
    const startFlag = component.startsWith("/");
    const endFlag = component.endsWith(".vue") || component.endsWith(".tsx");
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf(".");
    return k.substring(startIndex, lastIndex) === component;
  });

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicPagesModules[matchKey];
  } else if (matchKeys?.length > 1) {
    logger.warn(
      "Please do not create .vue and .tsx files with the same name in the same directory under the pages folder, otherwise dynamic importing will fail.",
      field("请不要在pages目录下的同一层级目录中创建同名的.vue和.tsx文件，否则会导致动态引入失败", ""),
    );
  } else {
    logger.warn(`Could not find \`${component}.vue\` or \`${component}.tsx\` in src/pages/, please create it yourself!`, field(`在src/pages/中找不到\`${component}.vue\`或\`${component}.tsx\`，请自行创建！`, ""));
    return EXCEPTION_COMPONENT;
  }
}

/**
 * Converts backend objects to route objects
 * 将后端对象转换为路由对象
 * @param routeList 路由配置项列表
 * @returns 转换后的路由配置项列表
 */
export function transformBackendDataToRoutes(routeList: RouteRecordRaw[]): RouteRecordRaw[] {
  routeList.forEach((route) => {
    const component = route.component as string | undefined;
    if (component) {
      if (component.toUpperCase() === "LAYOUT") {
        route.component = layoutMap.get(component.toUpperCase());
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${String(route.name)}Parent`;
        const meta = route.meta ?? {};
        meta.shouldShallowMenu = true;
        meta.shouldAffixToNavBar = false;
        route.meta = meta;
      }
    } else {
      logger.warn(`Please configure the component property of the ${String(route.name)} route correctly.`, field(`请正确配置${String(route.name)}路由的component属性。`, ""));
    }

    route.children && asyncImportRoute(route.children, undefined);
  });

  return routeList;
}
