import type { Ref } from "vue";
import { ref } from "vue";

export function useLoading(initValue = false): { loading: Ref<boolean>; setLoading: (loadingValue: boolean) => void } {
  const loading = ref(initValue);
  const setLoading = (loadingValue: boolean) => {
    loading.value = loadingValue;
  };
  return {
    loading,
    setLoading,
  };
}
