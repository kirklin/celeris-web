import type { MenuModule } from "@celeris/types";
import { loadDataFromModules } from "./moduleHelper";

/**
 * 从模块对象中加载菜单配置并加入到菜单集合中
 * Load menu configurations from modules and add them to a menu collection
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的菜单配置数组 Loaded menu configuration array
 */
export function loadMenusFromModules(modules: Record<string, { default: any }>): MenuModule[] {
  return loadDataFromModules<MenuModule>(modules);
}
