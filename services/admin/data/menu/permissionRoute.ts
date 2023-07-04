import type { RouteItem } from "../../models/menu/RouteItem";

export const permissionRoute: RouteItem = {
  path: "/permission",
  name: "Permission",
  component: "LAYOUT",
  redirect: "/permission/frontend/page",
  meta: {
    orderNo: 15,
    icon: "i-mdi-security",
    title: "权限管理",
  },
  children: [
    {
      path: "back",
      name: "PermissionBackDemo",
      meta: {
        title: "基于后台权限",
      },
      children: [
        {
          path: "page",
          name: "BackAuthPage",
          component: "/permission/backend/index.vue",
          meta: {
            title: "页面权限",
          },
        },
        {
          path: "button-permission",
          name: "BackButtonAuth",
          component: "/permission/backend/ButtonPermission.vue",
          meta: {
            title: "按钮权限",
          },
        },
      ],
    },
  ],
};
