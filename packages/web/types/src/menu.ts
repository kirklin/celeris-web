import type { RouteMeta } from "vue-router";
import type { RoleConstants } from "@celeris/constants";

/**
 * Interface for a menu item.
 * 菜单项接口。
 */
export interface Menu {
  // Name of the menu item.
  // 菜单项名称。
  name: string;

  // Icon for the menu item.
  // 菜单项图标。
  icon?: string;

  // Path for the menu item route.
  // 菜单项路由路径。
  path: string;

  // Auto-assignment of the path when it contains a parameter.
  // 路径包含参数时，自动赋值。
  paramPath?: string;

  // Whether the menu item is disabled.
  // 是否禁用该菜单项。
  shouldDisabled?: boolean;

  // Child menu items.
  // 子菜单项。
  children?: Menu[];

  // Order of the menu item.
  // 菜单项顺序。
  orderNumber?: number;

  // Roles that can access the menu item.
  // 可访问该菜单项的角色。
  allowedRoles?: RoleConstants[];

  // Route metadata for the menu item.
  // 菜单项的路由元数据。
  meta?: Partial<RouteMeta>;

  // Whether to hide the menu item.
  // 是否隐藏该菜单项。
  shouldHideMenu?: boolean;

  // Description of the menu item.
  // 菜单项描述。
  description?: string;

  // Additional data for the menu item.
  // 菜单项额外数据。
  data?: Record<string, any>;

  // Whether to show the menu item.
  // 是否显示该菜单项。
  shouldShow?: boolean;
}

/**
 * Interface for a menu module.
 * 菜单模块接口。
 */
export interface MenuModule {

  // Order of the menu module.
  // 菜单模块顺序。
  orderNumber?: number;

  // Menu items of the menu module.
  // 菜单模块项。
  menu: Menu;

  // Additional data for the menu module.
  // 菜单模块额外数据。
  data?: Record<string, any>;
}
