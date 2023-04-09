import type { MenuModule } from "@celeris/types";
import { isArray } from "./typeChecks";

/**
 * 从模块对象中加载菜单配置并加入到菜单集合中
 * Load menu configurations from modules and add them to a menu collection
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的菜单配置数组 Loaded menu configuration array
 */
export function loadMenusFromModules(modules: Record<string, { default: any }>): MenuModule[] {
  // 创建一个空数组用于存储菜单配置 Create an empty array to store menu configurations
  const menuModuleList: MenuModule[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    // 如果当前模块的默认导出是一个数组，则将其展开并添加到菜单配置数组中，否则直接将其添加到数组中
    // If the default export of the current module is an array, expand it and add it to the menu configuration array; otherwise, add it directly to the array
    const modList = isArray(mod) ? [...mod] : [mod];
    menuModuleList.push(...modList);
  });
  // 返回菜单配置数组 Return the menu configuration array
  return menuModuleList;
}
