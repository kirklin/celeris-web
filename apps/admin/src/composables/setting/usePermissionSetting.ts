import type { RoleConstants } from "@celeris/constants";
import { PermissionModeConstants } from "@celeris/constants";
import { intersection, isArray } from "@celeris/utils";
import type { RouteRecordRaw } from "vue-router";
import { resetRouter, router } from "~/router";
import { DEFAULT_PROJECT_SETTING } from "~/setting/projectSetting";
import { useAppStoreWithOut } from "~/store/modules/app";
import { usePermissionStoreWithOut } from "~/store/modules/permission";
import { useUserStoreWithOut } from "~/store/modules/user";

export function useAppPermission() {
  const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();

  const getPermissionMode = toRef(() => appStore.getProjectSetting.permissionMode);

  const isBackendPermissionMode = toRef(() => getPermissionMode.value === PermissionModeConstants.BACKEND);

  const isRouteMappingPermissionMode = toRef(() => getPermissionMode.value === PermissionModeConstants.ROUTE_MAPPING);

  const isRolePermissionMode = toRef(() => getPermissionMode.value === PermissionModeConstants.ROLE);

  /**
   * Toggle permission mode function.
   * 切换权限模式函数。
   *
   * Changes the permission mode between backend and route mapping.
   * 在后端和路由映射之间切换权限模式。
   *
   */
  function togglePermissionMode() {
    appStore.setProjectSetting({
      permissionMode:
        appStore.projectSetting?.permissionMode === PermissionModeConstants.BACKEND
          ? PermissionModeConstants.ROUTE_MAPPING
          : PermissionModeConstants.BACKEND,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * 重置和重新获得权限资源信息
   * @returns Promise<void>
   */
  async function resume() {
    resetRouter();
    const routes: RouteRecordRaw[] = await permissionStore.buildRoutesAction();
    routes.forEach((route: RouteRecordRaw) => {
      router.addRoute(route);
    });
    permissionStore.setLastMenuBuildTime();
  }

  /**
   * Determine whether there is permission
   * 判断是否有权限
   * @param permission RoleConstants | RoleConstants[] | string | string[] permission value. 权限值
   * @param defaultValue boolean default value. 默认值
   * @returns boolean whether there is permission
   * 返回值是否有权限
   */
  function hasPermission(permission?: RoleConstants | RoleConstants[] | string | string[], defaultValue = false): boolean {
    if (!permission) {
      return defaultValue;
    }

    const permMode = DEFAULT_PROJECT_SETTING.permissionMode;

    if ([PermissionModeConstants.ROUTE_MAPPING, PermissionModeConstants.ROLE].includes(permMode)) {
      if (!isArray(permission)) {
        return userStore.getRoleList.includes(permission as RoleConstants);
      }
      return (intersection(permission, userStore.getRoleList)).length > 0;
    }

    if (PermissionModeConstants.BACKEND === permMode) {
      const allCodeList = permissionStore.getPermissionCodes as string[];
      if (!isArray(permission)) {
        return allCodeList.includes(permission);
      }
      return (intersection(permission, allCodeList)).length > 0;
    }
    return defaultValue;
  }

  /**
   * Change the roles of the current user.
   * 更改当前用户的角色。
   * @param roles RoleConstants | RoleConstants[] The roles to be assigned to the user. 要分配给用户的角色。
   * @returns Promise<void>
   */
  async function changeRole(roles: RoleConstants | RoleConstants[]): Promise<void> {
    if (DEFAULT_PROJECT_SETTING.permissionMode !== PermissionModeConstants.ROUTE_MAPPING) {
      throw new Error(
        "Please switch to ROUTE_MAPPING mode in the configuration before performing this operation.",
      );
    }

    if (!isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    await resume();
  }

  async function refreshMenu() {
    await resume();
  }
  return {
    getPermissionMode,
    isBackendPermissionMode,
    isRouteMappingPermissionMode,
    isRolePermissionMode,
    changeRole,
    hasPermission,
    togglePermissionMode,
    refreshMenu,
  };
}
