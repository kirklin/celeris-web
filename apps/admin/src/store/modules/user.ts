import { defineStore } from "pinia";

const APP_USER_STORE_ID = "APP_USER_STORE";

export const useUserStore = defineStore({
  id: APP_USER_STORE_ID,
  state: () => ({}),
  actions: {
    // 重置用户信息
    // Reset user information
    resetUserState() {
      // ...
    },
  },
});

// Need to be used outside the setup
// 需要在设置之外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
