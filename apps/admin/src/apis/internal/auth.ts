import type { FakeUserInfo } from "@celeris/admin-api/models/auth/FakeUserInfo";
import type { MessageMode, UserInfo } from "@celeris/types";
import { request } from "@celeris/request";

// Define the API endpoint URLs as an enum
enum API {
  Login = "/auth/login",
  Logout = "/auth/logout",
  UserInfo = "/user/info",
  PermissionCode = "/auth/permission-code",
}

// Define the parameters for the login API
export interface LoginParams {
  username: string;
  password: string;
}

// Define a function to call the login API
export function loginApi(
  params: LoginParams,
  errorMessageMode: MessageMode = "dialog",
) {
  // Make a POST request to the login API endpoint with the given parameters
  return request.post<Omit<FakeUserInfo, "extraInfo">>(
    {
      url: API.Login,
      params,
    },
    // Set the error message mode for the request
    {
      errorMessageMode,
    },
  );
}

// Define a function to call the logout API
export function logoutApi(
  errorMessageMode: MessageMode = "dialog",
) {
  // Make a GET request to the logout API endpoint
  return request.get<void>(
    {
      url: API.Logout,
    },
    // Set the error message mode for the request
    {
      errorMessageMode,
    },
  );
}

// Define a function to call the user info API
export function userInfoApi(
  errorMessageMode: MessageMode = "none",
) {
  // Make a GET request to the user info API endpoint
  return request.get<UserInfo>(
    {
      url: API.UserInfo,
    },
    // Set the error message mode for the request
    {
      errorMessageMode,
    },
  );
}

// Define a function to call the permission code API
export function permissionCodeApi(
  errorMessageMode: MessageMode = "dialog",
) {
  // Make a GET request to the permission code API endpoint
  return request.get<string[]>(
    {
      url: API.PermissionCode,
    },
    // Set the error message mode for the request
    {
      errorMessageMode,
    },
  );
}

export { API };
