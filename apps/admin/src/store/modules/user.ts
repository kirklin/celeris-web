import type { RoleInfo, UserInfo } from "@celeris/types/src/user";
import { defineStore } from "pinia";

const APP_USER_STORE_ID = "APP_USER_STORE";

interface UserState {
  // Whether the user should be logged in
  // 用户是否应该已登录
  shouldLoggedIn: boolean;

  // User information, may be null
  // 用户信息，可能为空
  userInfo: UserInfo | null;

  // User's token obtained after logging in
  // 用户登录后获取的 Token 令牌
  token?: string;

  // User's refresh token obtained after logging in
  // 用户登录后获取的刷新 Token
  refreshToken?: string;

  // List of roles for the user
  // 用户的角色列表
  roleList: RoleInfo[];

  // Whether the password has expired, optional
  // 密码是否已过期，可选
  shouldPasswordExpired?: boolean;

  // Last time user information was updated, optional
  // 用户信息最后更新时间，可选
  updatedAt?: Date | number;
}

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
