import type { RoleConstants } from "@celeris/constants";

export interface UserInfo {
  // User's unique identifier
  // 用户的唯一标识符
  id: string | number;

  // User's username
  // 用户名
  username: string;

  // User's phone number
  // 手机号
  phone?: string;

  // User's email address
  // 邮箱地址
  email?: string;

  // User's full name, optional
  // 用户的全名，可选
  fullName?: string;

  // User's avatar URL, optional
  // 用户头像的 URL，可选
  avatarUrl?: string;

  // User's role, optional
  // 用户的角色，可选
  roles?: RoleConstants[];

  // User's home page URL after logging in, optional
  // 用户登录后跳转的首页路径，可选
  homePageUrl?: string;

  // Additional user information, optional
  // 其他用户信息，可选
  extraInfo?: Record<string, any>;
}
