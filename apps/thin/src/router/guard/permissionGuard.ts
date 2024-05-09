import type { RouteRecordRaw, Router } from "vue-router";
import { PageConstants } from "@celeris/constants";
import { RootRoute } from "~/router/routes";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";
import { usePermissionStoreWithOut } from "~/store/modules/permission";
import { useUserStoreWithOut } from "~/store/modules/user";

const LOGIN_PATH = PageConstants.BASE_LOGIN;
const ROOT_PATH = RootRoute.path;
const whitePathList: PageConstants[] = [LOGIN_PATH];
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH
      && to.path === PageConstants.BASE_HOME
      && userStore.getUserInfo?.homePageUrl
      && userStore.getUserInfo.homePageUrl !== PageConstants.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePageUrl);
      return;
    }

    const token = userStore.getToken;
    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageConstants)) {
      if (to.path === LOGIN_PATH && token) {
        const shouldPasswordExpired = userStore.getShouldPasswordExpired;
        try {
          await userStore.performAfterLoginAction();
          if (!shouldPasswordExpired) {
            next((to.query?.redirect as string) || "/");
            return;
          }
        } catch {
          //
        }
      }
      next();
      return;
    }

    // token or user does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.shouldIgnoreAuth) {
        next();
        return;
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH
      && to.name === PAGE_NOT_FOUND_ROUTE.name
      && to.fullPath !== (userStore.getUserInfo?.homePageUrl || PageConstants.BASE_HOME)
    ) {
      next(userStore.getUserInfo?.homePageUrl || PageConstants.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty
    if (userStore.getUpdatedAt === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getShouldAddRouteDynamically) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route);
    });

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    permissionStore.setShouldAddRouteDynamically(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
