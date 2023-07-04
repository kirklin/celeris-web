import type { Menu } from "@celeris/types";
import type { RoleConstants } from "@celeris/constants";
import { APP_PERMISSION_STORE_ID, PermissionModeConstants } from "@celeris/constants";
import { filterTree, flattenMultiLevelRoutes, transformRouteToMenu } from "@celeris/utils";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { permissionCodeApi } from "~/apis/internal/auth";
import { menusApi } from "~/apis/internal/menu";
import { asyncRoutes } from "~/router/routes";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";
import { transformBackendDataToRoutes } from "~/router/routes/utils";
import { useAppStore } from "~/store/modules/app";
import { useUserStore } from "~/store/modules/user";

// 定义权限状态接口
// Define the interface for permission state
interface PermissionState {
  // 存储用户的权限码列表，可以是字符串或数字
  // Store the user's permission code list, which can be strings or numbers
  permissionCodes: string[] | number[];
  // 当前路由是否是动态添加的标识
  // Flag indicating whether the current route is dynamically added
  shouldAddRouteDynamically: boolean;
  // 上一次菜单更新的时间戳，用于判断是否需要更新菜单
  // Timestamp of the last menu update, used to determine if the menu needs to be updated
  lastMenuBuildTime: number;
  // 后台控制的菜单列表，用于动态生成路由表
  // Menu list controlled by backend for dynamic route generation
  backendMenuList: Menu[];
  // 前端控制的菜单列表，通过用户角色来过滤
  // Menu list controlled by frontend, filtered by user roles
  frontendMenuList: Menu[];
}

export const usePermissionStore = defineStore({
  id: APP_PERMISSION_STORE_ID,
  state: (): PermissionState => ({
    // 存储用户的权限码列表，可以是字符串或数字
    // Store the user's permission code list, which can be strings or numbers
    permissionCodes: [],
    // 当前路由是否是动态添加的标识
    // Flag indicating whether the current route is dynamically added
    shouldAddRouteDynamically: false,
    // 上一次菜单更新的时间戳，用于判断是否需要更新菜单
    // Timestamp of the last menu update, used to determine if the menu needs to be updated
    // 初始值为0是为了立即刷新菜单
    // Initial value of 0 is to immediately refresh the menu
    lastMenuBuildTime: 0,
    // 后台控制的菜单列表，用于动态生成路由表
    // Menu list controlled by backend for dynamic route generation
    backendMenuList: [],
    // 前端控制的菜单列表，通过用户角色来过滤
    // Menu list controlled by frontend, filtered by user roles
    frontendMenuList: [],
  }),
  getters: {
    // 获取用户的权限码列表
    // Get the user's permission code list
    getPermissionCodes(state): string[] | number[] {
      return state.permissionCodes;
    },
    // 获取后台控制的菜单列表
    // Get the menu list controlled by backend
    getBackendMenuList(state): Menu[] {
      return state.backendMenuList;
    },
    // 获取前端控制的菜单列表
    // Get the menu list controlled by frontend
    getFrontendMenuList(state): Menu[] {
      return state.frontendMenuList;
    },
    // 获取上一次菜单更新的时间戳
    // Get the timestamp of the last menu update
    getLastMenuBuildTime(state): number {
      return state.lastMenuBuildTime;
    },
    // 获取当前路由是否是动态添加的标识
    // Get the flag indicating whether the current route is dynamically added
    getShouldAddRouteDynamically(state): boolean {
      return state.shouldAddRouteDynamically;
    },
  },
  actions: {
    // 设置用户的权限码列表
    // Set the user's permission code list
    setPermissionCodes(codeList: string[]) {
      this.permissionCodes = codeList;
    },
    // 设置后台控制的菜单列表
    // Set the menu list controlled by backend
    setBackendMenuList(menuList: Menu[]) {
      this.backendMenuList = menuList;
      menuList.length > 0 && this.setLastMenuBuildTime();
    },
    // 设置前端控制的菜单列表
    // Set the menu list controlled by frontend
    setFrontendMenuList(menuList: Menu[]) {
      this.frontendMenuList = menuList;
    },
    // 设置上一次菜单更新的时间戳
    // Set the timestamp of the last menu update
    setLastMenuBuildTime(time?: number) {
      this.lastMenuBuildTime = time || Date.now();
    },
    // 设置当前路由是否是动态添加的标识
    // Set the flag indicating whether the current route is dynamically added
    setShouldAddRouteDynamically(flag: boolean) {
      this.shouldAddRouteDynamically = flag;
    },
    // 清空权限状态
    // Clear permission state
    resetPermissionState() {
      this.permissionCodes = [];
      this.backendMenuList = [];
      this.frontendMenuList = [];
      this.lastMenuBuildTime = 0;
      this.shouldAddRouteDynamically = false;
    },

    async changePermissionCode() {
      const permissionCodes = await permissionCodeApi();
      this.setPermissionCodes(permissionCodes);
    },

    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      const userStore = useUserStore();
      const appStore = useAppStore();
      let routes: RouteRecordRaw[] = [];

      // Get user's roles and permission mode from app store
      const roleList: RoleConstants[] = toRaw(userStore.getRoleList) || [];
      const permissionMode = appStore.getProjectSetting.permissionMode || PermissionModeConstants.ROUTE_MAPPING;
      // Filter routes by allowed roles
      const routeFilterByRole = (route: RouteRecordRaw) => {
        const { meta }: { meta?: { allowedRoles?: RoleConstants[] } } = route;
        const { allowedRoles } = meta || {};
        if (!allowedRoles) {
          return true;
        }
        return roleList.some(role => allowedRoles.includes(role));
      };

      // Filter out routes with meta.shouldIgnoreRoute = true
      const routeFilterIgnore = (route: RouteRecordRaw) => {
        const { meta } = route;
        const { shouldIgnoreRoute } = meta || {};
        return !shouldIgnoreRoute;
      };

      switch (permissionMode) {
        case PermissionModeConstants.ROLE: {
          // Filter non-top-level routes by allowed roles
          routes = filterTree(asyncRoutes, routeFilterByRole);
          // Filter top-level routes by allowed roles
          routes = routes.filter(routeFilterByRole);
          // Convert multi-level routing to level 2 routing
          routes = flattenMultiLevelRoutes(routes);
          break;
        }
        case PermissionModeConstants.ROUTE_MAPPING: {
          // Filter non-top-level routes by allowed roles
          routes = filterTree(asyncRoutes, routeFilterByRole);
          // Filter top-level routes by allowed roles
          routes = routes.filter(routeFilterByRole);
          // Convert routes to menu
          const menuList = transformRouteToMenu(routes, true);
          // Remove routes with meta.shouldIgnoreRoute = true
          routes = filterTree(routes, routeFilterIgnore);
          routes = routes.filter(routeFilterIgnore);
          // Sort menu items by meta.orderNo
          menuList.sort((a, b) => {
            return (Number(a.meta?.orderNumber) || 0) - (Number(b.meta?.orderNumber) || 0);
          });
          // Set frontend menu list
          this.setFrontendMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flattenMultiLevelRoutes(routes);
          break;
        }
        case PermissionModeConstants.BACKEND: {
          // TODO: Show loading message while fetching permission codes
          let routeList: RouteRecordRaw[] = [];
          try {
            await this.changePermissionCode();
            // Fetch routes from backend
            routeList = (await menusApi()) as RouteRecordRaw[];
          } catch (error) {
            console.error(error);
          }
          // Dynamically import route components
          routeList = transformBackendDataToRoutes(routeList);
          // Convert routes to menu
          const backMenuList = transformRouteToMenu(routeList);
          // Set backend menu list
          this.setBackendMenuList(backMenuList);
          // Remove routes with meta.shouldIgnoreRoute = true
          routeList = filterTree(routeList, routeFilterIgnore);
          routeList = routeList.filter(routeFilterIgnore);
          // Convert multi-level routing to level 2 routing
          routeList = flattenMultiLevelRoutes(routeList);
          // Add 404 route to start of array
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
        }
      }

      return routes;
    },
  },
});

// Need to be used outside the setup
// 需要在设置之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
