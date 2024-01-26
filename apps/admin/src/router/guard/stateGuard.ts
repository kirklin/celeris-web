import type { Router } from "vue-router";
import { PageConstants } from "@celeris/constants";
import { removeRouteChangeListener } from "~/router/mitt/routeChange";
import { useAppStore } from "~/store/modules/app";
import { usePermissionStore } from "~/store/modules/permission";
import { useUserStore } from "~/store/modules/user";
import { useTabsStore } from "~/store/modules/tabs";

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Clear authentication information when user enters login page
    if (to.path === PageConstants.BASE_LOGIN) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      const tabsStore = useTabsStore();
      appStore.resetAPPState();
      permissionStore.resetPermissionState();
      userStore.resetUserState();
      tabsStore.resetTabsState();
      removeRouteChangeListener();
    }
  });
}
