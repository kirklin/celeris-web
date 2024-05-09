import type { ProjectSetting } from "@celeris/types";
import {
  PermissionCacheTypeConstants,
  PermissionModeConstants,
  RouterTransitionConstants,
  SessionTimeoutProcessingConstants,
  SettingButtonPositionConstants,
} from "@celeris/constants";

export const DEFAULT_PROJECT_SETTING: ProjectSetting = {
  // 是否显示配置按钮
  // Whether to display the setting button
  shouldShowSettingButton: true,

  // 国际化语言
  // The locale
  locale: "en",

  // 是否显示主题切换按钮
  // Whether to display the dark mode toggle button
  shouldShowDarkModeToggle: true,

  // 配置按钮显示位置
  // The position of the setting button display
  settingButtonPosition: SettingButtonPositionConstants.AUTO,

  // 权限模式
  // The permission mode
  permissionMode: PermissionModeConstants.ROUTE_MAPPING,

  // 权限缓存类型
  // The permission cache type
  permissionCacheType: PermissionCacheTypeConstants.LOCAL_STORAGE,

  // 会话超时处理方式
  // The session timeout processing method
  sessionTimeoutProcessing: SessionTimeoutProcessingConstants.ROUTE_JUMP,

  // 主界面全屏显示，不显示菜单和顶部
  // Whether to display the main interface in full screen, without menu and top bar
  shouldShowFullContent: false,

  // 是否显示 logo
  // Whether to display the logo
  shouldShowLogo: true,

  // 是否显示全局底部
  // Whether to display the global footer
  shouldShowFooter: true,

  // 头部设置
  // The header setting
  headerSetting: {

    // 是否显示网站头部
    // Whether to display the website header
    shouldShow: true,

    // 是否显示全屏按钮
    // Whether to display the full screen button
    shouldShowFullScreen: true,

    // 是否显示搜索
    // Whether to display the search
    shouldShowSearch: true,

    // 是否显示通知
    // Whether to display the notice
    shouldShowNotice: true,

    // 是否显示设置抽屉
    // Whether to display the setting drawer
    shouldShowSettingDrawer: false,
  },

  // 菜单设置
  // The menu setting
  menuSetting: {
    collapsed: false,
  },

  // 动画配置
  // The animation configuration
  transitionSetting: {
    // 是否开启页面切换动画
    // Whether to open the page switching animation
    shouldEnable: true,
    // 路由基本切换动画
    // Route basic switching animation
    routerBasicTransition: RouterTransitionConstants.FADE,
    // 是否开启页面切换加载
    // Whether to open page switching loading
    shouldOpenPageLoading: true,
    // 是否开启顶部进度条
    // Whether to open the top progress bar
    shouldOpenNProgress: true,
  },

  // 页面布局是否启用 keep-alive
  // Whether to enable keep-alive for page layout
  shouldOpenKeepAlive: true,

  // 锁屏时间
  // The lock screen time
  lockTime: 0,

  // 是否显示面包屑
  // Whether to display the breadcrumb
  shouldShowBreadCrumb: true,

  // 是否显示面包屑图标
  // Whether to display the breadcrumb icon
  shouldShowBreadCrumbIcon: true,

  // 是否使用 error-handler-plugin
  // Whether to use the error-handler-plugin
  shouldUseErrorHandle: false,

  // 是否开启返回顶部
  // Whether to enable the back to top function
  shouldUseOpenBackTop: true,

  // 是否可以嵌入 iframe 页面
  // Whether to embed iframe pages
  canEmbedIFramePage: true,

  // 是否在切换界面时删除未关闭的消息并通知
  // Whether to delete unclosed messages and notify when switching pages
  shouldCloseMessageOnSwitch: true,

  // 是否在切换界面时取消已发送但未响应的 http 请求
  // Whether to cancel sent but unresponsive http requests when switching pages
  shouldRemoveAllHttpPending: false,
};
