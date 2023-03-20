import type { TransitionSetting } from "@celeris/types";
import { computed } from "vue";
import { useAppStore } from "~/store/modules/appConfig";

export function useTransitionSetting() {
  const appStore = useAppStore();

  const getShouldEnableTransition = computed(() => appStore.getTransitionSetting?.shouldEnable);

  const getShouldOpenNProgress = computed(() => appStore.getTransitionSetting?.shouldOpenNProgress);

  const getShouldOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.shouldOpenPageLoading;
  });

  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);

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
