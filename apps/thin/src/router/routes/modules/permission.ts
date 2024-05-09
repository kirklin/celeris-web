// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { RoleConstants } from "@celeris/constants";
import { LAYOUT, getParentLayout } from "~/router/constant";

const permission: RouteRecordRaw = {
  path: "/permission",
  name: "Permission",
  component: LAYOUT,
  redirect: "/permission/frontend/page",
  meta: {
    title: "routes.permission.permission",
    icon: "i-mdi-security",
    orderNo: 15,
  },

  children: [
    {
      path: "frontend",
      name: "PermissionFrontDemo",
      component: getParentLayout("PermissionFrontDemo"),
      redirect: "/permission/frontend/page",
      meta: {
        title: "routes.permission.frontend",
      },
      children: [
        {
          path: "page",
          name: "FrontPageAuth",
          component: () => import("~/pages/permission/frontend/index.vue"),
          meta: {
            title: "routes.permission.pageAuth",
          },
        },
        {
          path: "button-permission",
          name: "FrontButtonAuth",
          component: () => import("~/pages/permission/frontend/ButtonPermission.vue"),
          meta: {
            title: "routes.permission.buttonAuth",
          },
        },
        {
          path: "auth-pageA",
          name: "FrontAuthPageA",
          component: () => import("~/pages/permission/frontend/AuthPageA.vue"),
          meta: {
            title: "routes.permission.authPageA",
            allowedRoles: [RoleConstants.ADMIN],
          },
        },
        {
          path: "auth-pageB",
          name: "FrontAuthPageB",
          component: () => import("~/pages/permission/frontend/AuthPageB.vue"),
          meta: {
            title: "routes.permission.authPageB",
            allowedRoles: [RoleConstants.USER],
          },
        },
      ],
    },
    {
      path: "back",
      name: "PermissionBackDemo",
      component: getParentLayout("PermissionBackDemo"),
      redirect: "/permission/back/page",
      meta: {
        title: "routes.permission.backend",
      },
      children: [
        {
          path: "page",
          name: "BackAuthPage",
          component: () => import("~/pages/permission/backend/index.vue"),
          meta: {
            title: "routes.permission.pageAuth",
          },
        },
        {
          path: "button-permission",
          name: "BackButtonAuth",
          component: () => import("~/pages/permission/backend/ButtonPermission.vue"),
          meta: {
            title: "routes.permission.buttonAuth",
          },
        },
      ],
    },
  ],
};

export default permission;
