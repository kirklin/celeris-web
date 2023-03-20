import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from "vue-router";

/**
 * 从模块对象中加载路由配置并加入到路由集合中
 * Load route configurations from modules and add them to a route collection
 *
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的路由配置数组 Loaded route configuration array
 */
export function loadRoutesFromModules(modules: Record<string, { default: any }>): RouteRecordRaw[] {
  // 创建一个空数组用于存储路由配置 Create an empty array to store route configurations
  const routeModuleList: RouteRecordRaw[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    // 如果当前模块的默认导出是一个数组，则将其展开并添加到路由配置数组中，否则直接将其添加到数组中
    // If the default export of the current module is an array, expand it and add it to the route configuration array; otherwise, add it directly to the array
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });

  // 返回路由配置数组 Return the route configuration array
  return routeModuleList;
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
