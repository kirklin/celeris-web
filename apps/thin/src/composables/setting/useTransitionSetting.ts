import type { TransitionSetting } from "@celeris/types";
import { useAppStoreWithOut } from "~/store/modules/app";

export function useTransitionSetting() {
  const appStore = useAppStoreWithOut();

  const getShouldEnableTransition = toRef(() => appStore.getTransitionSetting.shouldEnable);

  const getShouldOpenNProgress = toRef(() => appStore.getTransitionSetting.shouldOpenNProgress);

  const getShouldOpenPageLoading = toRef(() => appStore.getTransitionSetting.shouldOpenPageLoading);

  const getRouterBasicTransition = toRef(() => appStore.getTransitionSetting.routerBasicTransition);

  const setRouterBasicTransition = (routerBasicTransition: TransitionSetting["routerBasicTransition"]) => {
    appStore.setProjectSetting({ transitionSetting: { routerBasicTransition } });
  };

  const setShouldEnableTransition = (shouldEnable: TransitionSetting["shouldEnable"]) => {
    appStore.setProjectSetting({ transitionSetting: { shouldEnable } });
  };

  const setShouldOpenNProgress = (shouldOpenNProgress: TransitionSetting["shouldOpenNProgress"]) => {
    appStore.setProjectSetting({ transitionSetting: { shouldOpenNProgress } });
  };

  const setShouldOpenPageLoading = (shouldOpenPageLoading: TransitionSetting["shouldOpenPageLoading"]) => {
    appStore.setProjectSetting({ transitionSetting: { shouldOpenPageLoading } });
  };

  function getTransitionSetting() {
    return appStore.getTransitionSetting;
  }
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectSetting({ transitionSetting });
  }
  return {
    getTransitionSetting,
    setTransitionSetting,

    getShouldEnableTransition,
    setShouldEnableTransition,
    getShouldOpenNProgress,
    setShouldOpenNProgress,
    getShouldOpenPageLoading,
    setShouldOpenPageLoading,
    getRouterBasicTransition,
    setRouterBasicTransition,
  };
}
