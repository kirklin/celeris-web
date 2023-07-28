import type { RouteItem } from "../../models/menu/RouteItem";

export const permissionRoute: RouteItem = {
  path: "/permission",
  name: "Permission",
  component: "LAYOUT",
  redirect: "/permission/frontend/page",
  meta: {
    title: "routes.permission.permission",
    icon: "i-mdi-security",
    orderNo: 15,
  },
  children: [
    {
      path: "back",
      name: "PermissionBackDemo",
      meta: {
        title: "routes.permission.backend",
      },
      children: [
        {
          path: "page",
          name: "BackAuthPage",
          component: "/permission/backend/index.vue",
          meta: {
            title: "routes.permission.pageAuth",
          },
        },
        {
          path: "button-permission",
          name: "BackButtonAuth",
          component: "/permission/backend/ButtonPermission.vue",
          meta: {
            title: "routes.permission.buttonAuth",
          },
        },
      ],
    },
  ],
};
