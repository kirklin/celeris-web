import type { MessageMode, UserInfo } from "@celeris/types";
import { request } from "../request";

// Define the API endpoint URLs as an enum
enum API {
  Login = "/login",
}

// Define the parameters for the login API
export interface LoginParams {
  username: string;
  password: string;
}

// Define a function to call the login API
export function loginApi(
  params: LoginParams,
  errorMessageMode: MessageMode = "modal",
) {
  // Make a POST request to the login API endpoint with the given parameters
  return request.post<UserInfo>(
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
