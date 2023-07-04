import { dashboardRoute } from "../../data/menu/dashboardRoute";
import { permissionRoute } from "../../data/menu/permissionRoute";
import { getFakeUserByToken } from "../../utils/user";

export default eventHandler((event) => {
  try {
    const authorizationToken = extractAuthorizationToken(event);
    const fakeUserInfo = getFakeUserByToken(authorizationToken);
    const { id } = fakeUserInfo;
    let menus;
    switch (id) {
      case "1":
        menus = [dashboardRoute, permissionRoute];
        break;
      case "2":
        menus = [permissionRoute];
        break;
      default:
        menus = [];
    }
    return createSuccessResponse(menus);
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
