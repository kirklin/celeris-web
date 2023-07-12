import type { TransitionSetting } from "@celeris/types";
import { useAppStoreWithOut } from "~/store/modules/app";

export function useTransitionSetting() {
  const appStore = useAppStoreWithOut();

  const getShouldEnableTransition = toRef(() => appStore.getTransitionSetting.shouldEnable);

  const getShouldOpenNProgress = toRef(() => appStore.getTransitionSetting.shouldOpenNProgress);

  const getShouldOpenPageLoading = toRef(() => appStore.getTransitionSetting.shouldOpenPageLoading);

  const getBasicTransition = toRef(() => appStore.getTransitionSetting.basicTransition);

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
    getShouldOpenNProgress,
    getShouldOpenPageLoading,
    getBasicTransition,
  };
}
