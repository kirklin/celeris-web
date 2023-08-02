import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useTransitionSetting } from "~/composables";

interface Context {
  route: RouteLocationNormalizedLoaded;
}

interface TransitionOptions {
  enableTransition: boolean;
}

export function getTransitionName({ route }: Context, { enableTransition }: TransitionOptions): string | undefined {
  const { getRouterBasicTransition, getShouldEnableTransition } = useTransitionSetting();
  if (!enableTransition || !toValue(getShouldEnableTransition)) {
    return undefined;
  }

  return (route.meta.transitionName as string) || toValue(getRouterBasicTransition);
}
