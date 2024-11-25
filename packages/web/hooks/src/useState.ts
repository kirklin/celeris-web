import type { Ref } from "vue";
import type { BasicStateAction, Dispatch } from "./types";
import { isFunction } from "@celeris/utils";
import { ref } from "vue";

export function useState<S>(
  initialState?: (() => S) | S,
): [Ref<S>, Dispatch<BasicStateAction<S>>] {
  // "vue useState is use customRef to simulation.;

  let state = initialState;
  if (isFunction(initialState)) {
    state = initialState();
  }

  const reactiveState = ref(state) as Ref<S>;

  const dispatchAction = (actionOrState: ((prevState: S) => S) | S) => {
    if (isFunction(actionOrState)) {
      reactiveState.value = actionOrState(reactiveState.value);
    } else {
      reactiveState.value = actionOrState;
    }
  };

  return [reactiveState, dispatchAction];
}
