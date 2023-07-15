import type { RoleConstants, RouterTransitionConstants } from "@celeris/constants";

export {};

// Declare the module "vue-router" to add custom properties
// 声明模块 "vue-router" 以添加自定义属性
declare module "vue-router" {

  // Route meta information.
  // 路由的元信息
  export interface RouteMeta {
    // Order number for sorting the menu.
    // 用于对菜单进行排序的顺序号
    orderNumber?: number;

    // Title of the page.
    // 页面标题
    title: string;

    // The depth of the dynamic route.
    // 动态路由的深度
    dynamicRouteDepth?: number;

    // The real path of the route.
    // 路由的真实路径
    realPath?: string;

    // Whether to ignore authentication for the route.
    // 是否忽略路由的身份验证
    shouldIgnoreAuth?: boolean;

    // The roles that can access the page.
    // 可以访问页面的角色
    allowedRoles?: RoleConstants[];

    // Whether to keep the page alive after leaving.
    // 离开页面后是否保持页面存活
    shouldKeepAlive?: boolean;

    // Whether to affix the page on the navigation bar.
    // 是否将页面固定在导航栏上
    shouldAffixToNavBar?: boolean;

    // The icon to show on the navigation bar.
    // 导航栏上显示的图标
    icon?: string;

    // The URL of the page to show in an iframe.
    // 在 iframe 中显示页面的 URL
    iframeLink?: string;

    // The URL of the page to show in a new tab.
    // 在新标签页中显示页面的 URL
    externalLink?: string;

    // The name of the transition to use when navigating to this page.
    // 导航到该页面时使用的过渡动画名称
    transitionName?: RouterTransitionConstants;

    // Whether to hide the breadcrumb on the page.
    // 是否在页面上隐藏面包屑
    shouldHideBreadcrumb?: boolean;

    // Whether to hide the submenu of the page in the menu.
    // 是否在菜单中隐藏页面的子菜单
    shouldHideSubMenuInMenu?: boolean;

    // Whether to carry query parameters when navigating.
    // 导航时是否携带查询参数
    shouldCarryQueryParams?: boolean;

    // Whether to shallowly render the menu.
    // 是否浅渲染菜单
    shouldShallowMenu?: boolean;

    // The path of the currently active menu.
    // 当前激活菜单的路径
    currentActiveMenu?: string;

    // Whether to hide the page in the Tabs.
    // 是否在标签页中隐藏页面
    shouldHideInTabs?: boolean;

    // Whether to hide the page in the menu.
    // 是否在菜单中隐藏页面
    shouldHideInMenu?: boolean;

    // Whether to ignore the route when building the menu.
    // 构建菜单时是否忽略该路由
    shouldIgnoreRoute?: boolean;

    // Whether to hide the path for the child routes.
    // 是否在子路由中隐藏路径
    shouldHidePathForChildrenRouter?: boolean;
  }
}
