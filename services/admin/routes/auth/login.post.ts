import { fakeUserList } from "../../data/auth/fakeUserList";

export default eventHandler(async (event) => {
  const { username, password } = await readBody(event);

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
});
