import { RoleConstants } from "@celeris/constants";
import type { UserInfo } from "@celeris/types";
import type { RequestParams } from "@celeris/utils";
import { createErrorResponse, createSuccessResponse, extractAuthorizationToken } from "@celeris/utils";
import type { MockMethod } from "vite-plugin-mock";

export interface FakeUserInfo extends UserInfo {
  token: string;
  extraInfo: {
    password: string;
  };
}

const fakeUserList: FakeUserInfo[] = [
  {
    id: "1",
    username: "kirklin",
    fullName: "Kirk Lin",
    phone: "15912345678",
    avatarUrl: "https://avatars.githubusercontent.com/u/17453452",
    homePageUrl: "/dashboard/index",
    roles: [
      {
        name: RoleConstants.ADMIN,
        description: "Admin",
      },
    ],
    token: "adminFakeToken",
    extraInfo: {
      password: "123456",
    },
  },
  {
    id: "2",
    username: "user",
    fullName: "Celeris User",
    phone: "13887654321",
    avatarUrl: "https://avatars.githubusercontent.com/u/17453452",
    roles: [
      {
        name: RoleConstants.USER,
        description: "User",
      },
    ],
    token: "userFakeToken",
    extraInfo: {
      password: "123456",
    },
  },
  {
    id: "3",
    username: "guest",
    fullName: "Guest",
    roles: [
      {
        name: RoleConstants.GUEST,
        description: "Guest",
      },
    ],
    token: "guestFakeToken",
    extraInfo: {
      password: "123456",
    },
  },
];

interface FakeCodeList {
  [id: string]: string[];
}

const fakeCodeList: FakeCodeList = {
  1: ["1000", "3000", "5000"],
  2: ["2000", "4000", "6000"],
};

const getFakeUserByToken = (authorizationToken?: string) => {
  if (!authorizationToken) {
    throw new Error("Token is required.");
  }
  const checkUser = fakeUserList.find(
    item => item.token === authorizationToken,
  );
  if (!checkUser) {
    throw new Error("Invalid token.");
  }
  return checkUser;
};

const mockMethods: MockMethod[] = [
  {
    // Mock the API endpoint for user login
    url: "/api/auth/login",
    timeout: 200,
    method: "post",
    // Define the response function for the login endpoint
    response: ({ body }) => {
      // Extract the username and password from the request body
      const { username, password } = body;
      // Find a user in the fake user list that matches the username and password
      const matchedUser = fakeUserList.find(
        user =>
          user.username === username && password === user.extraInfo?.password,
      );
      // If no user is found, return an error response
      if (!matchedUser) {
        return createErrorResponse("Incorrect account or password！");
      }
      // If a user is found, extract the user object without the extra info
      const { extraInfo: _extraInfo, ...user } = matchedUser;
      // Return a success response with the user object
      return createSuccessResponse(user);
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response: (request: RequestParams) => {
      try {
        const authorizationToken = extractAuthorizationToken(request);
        const checkUser = getFakeUserByToken(authorizationToken);
        const { extraInfo: _extraInfo, token: _token, ...user } = checkUser;
        return createSuccessResponse({ ...user, extraInfo: undefined });
      } catch (error) {
        return createErrorResponse(error instanceof Error ? error.message : String(error));
      }
    },
  },
  {
    url: "/api/user/permission-code",
    timeout: 200,
    method: "get",
    response: (request: RequestParams) => {
      try {
        const authorizationToken = extractAuthorizationToken(request);
        const checkUser = getFakeUserByToken(authorizationToken);
        const codeList = fakeCodeList[checkUser.id];

        return createSuccessResponse(codeList);
      } catch (error) {
        return createErrorResponse(error instanceof Error ? error.message : String(error));
      }
    },
  },
  {
    url: "/api/auth/logout",
    timeout: 200,
    method: "get",
    response: (request: RequestParams) => {
      try {
        const authorizationToken = extractAuthorizationToken(request);
        getFakeUserByToken(authorizationToken);
        return createSuccessResponse(undefined, "Token has been destroyed");
      } catch (error) {
        return createErrorResponse(error instanceof Error ? error.message : String(error));
      }
    },
  },
];

export { fakeUserList };
export default mockMethods;
