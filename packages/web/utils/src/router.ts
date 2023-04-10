import { pathToRegexp } from "path-to-regexp";
import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
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
