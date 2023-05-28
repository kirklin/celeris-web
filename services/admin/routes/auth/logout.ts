import { getErrorMessage } from "../../utils/mock";
import { getFakeUserByToken } from "../../utils/user";

export default eventHandler((event) => {
  try {
    const authorizationToken = extractAuthorizationToken(event);
    getFakeUserByToken(authorizationToken);
    return createSuccessResponse(undefined, "Token has been destroyed");
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
