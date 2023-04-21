import type { RouteRecordRaw } from "vue-router";
import { cloneDeep, logger } from "@celeris/utils";
import { IFRAME, LAYOUT, getParentLayout } from "~/router/constant";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";

const layoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();
layoutMap.set("LAYOUT", LAYOUT);
layoutMap.set("IFRAME", IFRAME);

// 动态路由模块
let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

/**
 * 异步导入路由组件
 * @param routes 路由配置项
 */
function asyncImportRoute(routes: RouteRecordRaw[] | undefined) {
  // 动态引入views目录下的所有.vue和.tsx文件
  dynamicViewsModules = dynamicViewsModules || import.meta.glob<{ default: any }>("../../views/**/*.{vue,tsx}");
  if (!routes) {
    return;
  }

  // 遍历路由配置项
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      // 对于需要应用iframe的路由，设置component为FrameBlank组件
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      item.component = "IFRAME";
    }

    const { component, name } = item;
    const { children } = item;
    if (component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const layoutFound = layoutMap.get(component.toUpperCase());
      if (layoutFound) {
        // 对于已存在的布局组件，直接使用
        item.component = layoutFound;
      } else {
        // 对于动态路由组件，进行动态导入
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        item.component = dynamicImport(dynamicViewsModules, component as string);
      }
    } else if (name) {
      // 对于没有设置component的路由，使用默认布局组件
      item.component = getParentLayout();
    }

    // 递归处理子路由
    children && asyncImportRoute(children);
  });
}

/**
 * 动态导入路由组件
 * @param dynamicViewsModules 动态路由模块
 * @param component 组件名称
 */
function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace("../../views", "");
    const startFlag = component.startsWith("/");
    const endFlag = component.endsWith(".vue") || component.endsWith(".tsx");
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf(".");
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    console.warn(
      "请不要在views目录下的同一层级目录中创建同名的.vue和.tsx文件，否则会导致动态引入失败",
    );
  } else {
    console.warn(
      `在src/views/下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`,
    );
    // TODO: 异常页面
    return PAGE_NOT_FOUND_ROUTE;
  }
}

/**
 * 将后端对象转换为路由对象
 * @param routeList 路由配置项列表
 * @returns 转换后的路由配置项列表
 */
export function transformBackendDataToRoute<T = RouteRecordRaw>(routeList: RouteRecordRaw[]): T[] {
  routeList.forEach((route) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === "LAYOUT") {
        // 对于已存在的布局组件，直接使用
        route.component = layoutMap.get(component.toUpperCase());
      } else {
        // 对于动态路由组件，使用默认布局组件，并将原配置项作为子路由添加
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${String(route.name)}Parent`;
        const meta = route.meta || {};
        meta.shouldShallowMenu = true;
        meta.shouldAffixToNavBar = false;
        route.meta = meta;
      }
    } else {
      logger.warn(`请正确配置路由：${String(route.name)}的component属性`);
    }

    // 递归处理子路由
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}
