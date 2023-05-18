import type { TransitionSetting } from "@celeris/types";
import { useAppStore } from "~/store/modules/app";

export function useTransitionSetting() {
  const appStore = useAppStore();

  const getShouldEnableTransition = toRef(() => appStore.getTransitionSetting.shouldEnable);

  const getShouldOpenNProgress = toRef(() => appStore.getTransitionSetting.shouldOpenNProgress);

  const getShouldOpenPageLoading = toRef(() => appStore.getTransitionSetting.shouldOpenPageLoading);

  const getBasicTransition = toRef(() => appStore.getTransitionSetting.basicTransition);

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }
  return {
    setTransitionSetting,

    getShouldEnableTransition,
    getShouldOpenNProgress,
    getShouldOpenPageLoading,
    getBasicTransition,
  };
}
