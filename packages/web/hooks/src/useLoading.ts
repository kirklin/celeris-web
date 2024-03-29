export function useLoading(initValue = false) {
  const loading = ref(initValue);
  const setLoading = (loadingValue: boolean) => {
    loading.value = loadingValue;
  };
  return {
    loading,
    setLoading,
  };
}
