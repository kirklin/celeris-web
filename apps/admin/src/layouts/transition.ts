import { toValue } from "vue";
import type { FunctionalComponent } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useTransitionSetting } from "~/composables";

interface Context {
  Component: FunctionalComponent & { type: Recordable };
  route: RouteLocationNormalizedLoaded;
}

interface TransitionOptions {
  enableTransition: boolean;
}

export function getTransitionName({ route }: Context, { enableTransition }: TransitionOptions): string | undefined {
  const { getBasicTransition } = useTransitionSetting();
  if (!enableTransition) {
    return undefined;
  }

  return (route.meta.transitionName as string) || toValue(getBasicTransition);
}
