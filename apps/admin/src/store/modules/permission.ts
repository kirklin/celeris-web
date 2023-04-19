import type { Menu } from "@celeris/types";
import { APP_PERMISSION_STORE_ID } from "@celeris/constants";
import { defineStore } from "pinia";

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
  },
});

// Need to be used outside the setup
// 需要在设置之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
