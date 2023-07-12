import type { Ref } from "vue";
import { ref } from "vue";

export function useState<T>(defaultValue?: T): [Ref<T>, (newValue: T) => void] {
  const value = ref(defaultValue) as Ref<T>;
  const setValue = (newValue: T) => {
    value.value = newValue;
  };

  return [value, setValue];
}
