import { cloneDeep, omit } from "lodash-es";
import { pathToRegexp } from "path-to-regexp";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw, Router } from "vue-router";
import { loadDataFromModules } from "./moduleHelper";

/**
 * 从模块对象中加载路由配置并加入到路由集合中
 * Load route configurations from modules and add them to a route collection
 *
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的路由配置数组 Loaded route configuration array
 */
export function loadRoutesFromModules(modules: Record<string, { default: any }>): RouteRecordRaw[] {
  return loadDataFromModules<RouteRecordRaw>(modules);
}

/**
 * Get the raw route
 * 获取原始路由
 * @param {RouteLocationNormalized} route - The route object
 * @returns {RouteLocationNormalized} The raw route object 原始路由对象
 */
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) {
    return route;
  }
  // Destructure the route object, get the matched property and other properties
  // 解构route对象，获取matched属性和其他属性
  const { matched, ...otherProps } = route;
  return {
    ...otherProps,
    // Map the matched array, keep only meta, name and path properties and convert to RouteRecordNormalized type
    // 对matched数组进行映射，只保留meta、name、path三个属性，并转换为RouteRecordNormalized类型
    matched: matched?.map(({ meta, name, path }) => ({ meta, name, path })) as RouteRecordNormalized[],
  };
}

/**
 * Create a regular expression for matching a route path
 * 创建用于匹配路径的正则表达式
 * @param path The route path expression to match 匹配路径的表达式
 * @returns A regular expression used for matching the route path 返回用于匹配路径的正则表达式
 */
export function createPathMatcher(path: string): RegExp {
  return pathToRegexp(path);
}
/**
 * Converts multi-level routing to level 2 routing.
 * 将多级路由转换为二级路由。
 * @param routeModules The route modules to be flattened.
 * @returns The flattened route modules.
 */
export function flattenMultiLevelRoutes(routeModules: RouteRecordRaw[]): RouteRecordRaw[] {
  const modules: RouteRecordRaw[] = cloneDeep(routeModules);

  for (const module of modules) {
    // Skips to the next iteration if the route module is not a multi-level route.
    if (!isMultiLevelRoute(module)) {
      continue;
    }
    // Upgrades the route level.
    upgradeRouteLevel(module);
  }
  return modules;
}

/**
 * Upgrades the route level by adding all sub-routes to the secondary route.
 * 通过将所有子路由添加到二级路由来升级路由级别。
 * @param routeModule The route module to be upgraded.
 */
function upgradeRouteLevel(routeModule: RouteRecordRaw) {
  // Uses vue-router to concatenate menus.
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });
  // Gets all the routes.
  const routes = router.getRoutes();
  // Adds all the sub-routes to the secondary route.
  addToSecondaryRoute(routes, routeModule.children || [], routeModule);
  router = null;

  // Omits the 'children' property from each child route.
  routeModule.children = <RouteRecordRaw[] | undefined>routeModule.children?.map(child => omit(child, "children"));
}

/**
 * Adds all sub-routes to the secondary route.
 * 将所有子路由添加到二级路由。
 * @param routes The routes to be added to.
 * @param children The sub-routes to be added.
 * @param routeModule The route module to be upgraded.
 */
function addToSecondaryRoute(
  routes: RouteRecordNormalized[],
  children: RouteRecordRaw[],
  routeModule: RouteRecordRaw,
) {
  for (const child of children) {
    const route = routes.find(r => r.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find(c => c.name === route.name)) {
      routeModule.children?.push(route as unknown as RouteRecordRaw);
    }
    if (child.children?.length) {
      addToSecondaryRoute(routes, child.children, routeModule);
    }
  }
}

/**
 * Determines whether the route level exceeds 2 levels.
 * 判断路由级别是否超过二级。
 * @param routeModule The route module to be checked.
 * @returns True if the route level exceeds 2 levels, otherwise false.
 */
function isMultiLevelRoute(routeModule: RouteRecordRaw): boolean {
  // Checks if the route module has 'children' property and the children are not empty.
  if (!routeModule || !Reflect.has(routeModule, "children") || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  // Checks if any child route has sub-routes.
  for (const child of children) {
    if (child.children?.length) {
      return true;
    }
  }
  return false;
}
