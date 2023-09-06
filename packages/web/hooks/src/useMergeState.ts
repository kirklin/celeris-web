import type { ComputedRef, Ref } from "vue";
import { computed, toRef, watch } from "vue";
import { isUndefined } from "@celeris/utils";
import { useState } from "./useState";

export function useMergeState<T, E = T | undefined>(
  defaultValue: T,
  props: { value: E },
): [ComputedRef<T>, (val: E) => void, Ref<T>] {
  const value = toRef(props.value);
  const [localValue, setLocalValue] = useState(!isUndefined(value.value) ? value.value : defaultValue);
  watch(value, (newVal) => {
    isUndefined(newVal) && setLocalValue(undefined);
  });

  const mergeValue = computed(() => (!isUndefined(value.value) ? value.value : localValue.value));

  return [mergeValue, setLocalValue, localValue];
}
