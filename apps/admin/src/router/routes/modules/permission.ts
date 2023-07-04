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
    orderNo: 15,
    icon: "i-mdi-security",
    title: "权限管理",
  },

  children: [
    {
      path: "frontend",
      name: "PermissionFrontDemo",
      component: getParentLayout("PermissionFrontDemo"),
      meta: {
        title: "基于前端权限",
      },
      children: [
        {
          path: "page",
          name: "FrontPageAuth",
          component: () => import("~/pages/permission/frontend/index.vue"),
          meta: {
            title: "页面权限",
          },
        },
        {
          path: "button-permission",
          name: "FrontButtonAuth",
          component: () => import("~/pages/permission/frontend/ButtonPermission.vue"),
          meta: {
            title: "按钮权限",
          },
        },
        {
          path: "auth-pageA",
          name: "FrontAuthPageA",
          component: () => import("~/pages/permission/frontend/AuthPageA.vue"),
          meta: {
            title: "权限测试页A",
            allowedRoles: [RoleConstants.ADMIN],
          },
        },
        {
          path: "auth-pageB",
          name: "FrontAuthPageB",
          component: () => import("~/pages/permission/frontend/AuthPageB.vue"),
          meta: {
            title: "权限测试页B",
            allowedRoles: [RoleConstants.USER],
          },
        },
      ],
    },
    {
      path: "back",
      name: "PermissionBackDemo",
      component: getParentLayout("PermissionBackDemo"),
      meta: {
        title: "基于后台权限",
      },
      children: [
        {
          path: "page",
          name: "BackAuthPage",
          component: () => import("~/pages/permission/backend/index.vue"),
          meta: {
            title: "页面权限",
          },
        },
        {
          path: "button-permission",
          name: "BackButtonAuth",
          component: () => import("~/pages/permission/backend/ButtonPermission.vue"),
          meta: {
            title: "按钮权限",
          },
        },
      ],
    },
  ],
};

export default permission;
