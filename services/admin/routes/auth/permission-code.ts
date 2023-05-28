import { fakeCodeList } from "../../data/auth/fakeCodeList";
import { getErrorMessage } from "../../utils/mock";
import { getFakeUserByToken } from "../../utils/user";

export default eventHandler((event) => {
  try {
    const authorizationToken = extractAuthorizationToken(event);
    const checkUser = getFakeUserByToken(authorizationToken);
    const codeList = fakeCodeList[checkUser.id];

    return createSuccessResponse(codeList);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
