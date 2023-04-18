import { RoleConstants } from "@celeris/constants";
import type { UserInfo } from "@celeris/types";
import { createErrorResponse, createSuccessResponse } from "@celeris/utils";
import type { MockMethod } from "vite-plugin-mock";

interface FakeUserInfo extends UserInfo {
  extraInfo: {
    password: string;
  };
}

const fakeUserList: FakeUserInfo[] = [
  {
    id: "1",
    username: "lkk",
    fullName: "Kirk Lin",
    phone: "15912345678",
    avatarUrl: "https://avatars.githubusercontent.com/u/17453452",
    roles: [
      {
        name: RoleConstants.ADMIN,
        description: "Admin",
      },
    ],
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
    extraInfo: {
      password: "123456",
    },
  },
];

const mockMethods: MockMethod[] = [
  {
    // Mock the API endpoint for user login
    url: "/api/login",
    timeout: 200,
    method: "post",
    // Define the response function for the login endpoint
    response: ({ body }) => {
      // Extract the username and password from the request body
      const { username, password } = body;
      // Find a user in the fake user list that matches the username and password
      const matchedUser = fakeUserList.find(
        user => user.username === username && password === user.extraInfo?.password,
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
];

export { fakeUserList };
export default mockMethods;
