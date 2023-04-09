import { PermissionModeConstants } from "@celeris/constants";
import { useAppStoreWithOut } from "~/store/modules/appConfig";
const getPermissionMode = () => {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
};
const isBackendMode = () => {
  return getPermissionMode() === PermissionModeConstants.BACKEND;
};

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeConstants.ROUTE_MAPPING;
};

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeConstants.ROLE;
};
