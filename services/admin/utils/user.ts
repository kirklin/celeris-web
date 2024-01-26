import { fakeUserList } from "../data/auth/fakeUserList";

export function getFakeUserByToken(authorizationToken?: string) {
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
}
