import { getErrorMessage } from "../../utils/mock";
import { getFakeUserByToken } from "../../utils/user";

export default eventHandler((event) => {
  try {
    const authorizationToken = extractAuthorizationToken(event);
    const checkUser = getFakeUserByToken(authorizationToken);
    const { extraInfo: _extraInfo, token: _token, ...user } = checkUser;
    return createSuccessResponse({ ...user, extraInfo: undefined });
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
