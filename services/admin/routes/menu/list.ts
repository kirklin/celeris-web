import { dashboardRoute } from "../../data/menu/dashboardRoute";
import { getFakeUserByToken } from "../../utils/user";

export default eventHandler((event) => {
  try {
    const authorizationToken = extractAuthorizationToken(event);
    const fakeUserInfo = getFakeUserByToken(authorizationToken);
    const { id } = fakeUserInfo;
    let menus;
    switch (id) {
      case "1":
        menus = [dashboardRoute];
        break;
      case "2":
        menus = [dashboardRoute];
        break;
      default:
        menus = [];
    }
    return createSuccessResponse(menus);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
