// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { RoleConstants } from "@celeris/constants";
import { getParentLayout, LAYOUT } from "~/router/constant";

const permission: RouteRecordRaw = {
  path: "/permission",
  name: "PermissionRoot",
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
      name: "PermissionFrontend",
      component: getParentLayout("PermissionFrontend"),
      redirect: "/permission/frontend/page",
      meta: {
        title: "routes.permission.frontend",
      },
      children: [
        {
          path: "page",
          name: "PermissionFrontendPage",
          component: () => import("~/pages/permission/frontend/index.vue"),
          meta: {
            title: "routes.permission.pageAuth",
          },
        },
        {
          path: "button-permission",
          name: "PermissionFrontendButton",
          component: () => import("~/pages/permission/frontend/ButtonPermission.vue"),
          meta: {
            title: "routes.permission.buttonAuth",
          },
        },
        {
          path: "auth-pageA",
          name: "PermissionFrontendPageA",
          component: () => import("~/pages/permission/frontend/AuthPageA.vue"),
          meta: {
            title: "routes.permission.authPageA",
            allowedRoles: [RoleConstants.ADMIN],
          },
        },
        {
          path: "auth-pageB",
          name: "PermissionFrontendPageB",
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
      name: "PermissionBackend",
      component: getParentLayout("PermissionBackend"),
      redirect: "/permission/back/page",
      meta: {
        title: "routes.permission.backend",
      },
      children: [
        {
          path: "page",
          name: "PermissionBackendPage",
          component: () => import("~/pages/permission/backend/index.vue"),
          meta: {
            title: "routes.permission.pageAuth",
          },
        },
        {
          path: "button-permission",
          name: "PermissionBackendButton",
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
