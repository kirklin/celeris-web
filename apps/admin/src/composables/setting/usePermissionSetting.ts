import { PermissionModeConstants } from "@celeris/constants";
import { useAppStoreWithOut } from "~/store/modules/app";

export const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectSetting.permissionMode;
};
export const isBackendMode = () => {
  return getPermissionMode() === PermissionModeConstants.BACKEND;
};

export const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeConstants.ROUTE_MAPPING;
};

export const isRoleMode = () => {
  return getPermissionMode() === PermissionModeConstants.ROLE;
};
