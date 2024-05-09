import type { Router } from "vue-router";
import { useAppStoreWithOut } from "~/store/modules/app";
import { useUserStoreWithOut } from "~/store/modules/user";

export function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();
  const { getShouldEnableTransition, getShouldOpenPageLoading } = useTransitionSetting();

  router.beforeEach((to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (toValue(getShouldEnableTransition) && toValue(getShouldOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });

  router.afterEach(async () => {
    if (toValue(getShouldOpenPageLoading)) {
      await new Promise((resolve) => {
        // The minimum loading time in milliseconds
        const minimumLoadingTime = 500;

        // Get the current timestamp
        const startTimestamp = Date.now();

        appStore.setPageLoading(true);

        // Delay the minimum loading time
        setTimeout(() => {
          const endTimestamp = Date.now();

          // Calculate the remaining time to reach the minimum loading time
          const remainingTime = minimumLoadingTime - (endTimestamp - startTimestamp);

          if (remainingTime <= 0) {
            // If the remaining time is less than or equal to 0, hide the loading immediately
            appStore.setPageLoading(false);
            resolve(null);
          } else {
            // If the remaining time is greater than 0, wait for the remaining time before hiding the loading
            setTimeout(() => {
              appStore.setPageLoading(false);
              resolve(null);
            }, remainingTime);
          }
        }, 0);
      });
    }
    return true;
  });
}
