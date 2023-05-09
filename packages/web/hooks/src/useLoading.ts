import { useToggle } from "@vueuse/core";

export function useLoading(initValue = false) {
  const [value, toggle] = useToggle(initValue);
  const setLoading = (loadingValue: boolean) => {
    value.value = loadingValue;
  };
  return {
    loading: value,
    setLoading,
    toggle,
  };
}
