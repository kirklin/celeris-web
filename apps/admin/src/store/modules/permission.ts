import { defineStore } from "pinia";

const APP_PERMISSION_STORE_ID = "APP_PERMISSION";

export const usePermissionStore = defineStore({
  id: APP_PERMISSION_STORE_ID,
  state: () => ({
  }),
});

// Need to be used outside the setup
// 需要在设置之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
