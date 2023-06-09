import type { ProjectSetting } from "@celeris/types";
import { useAppStore } from "~/store/modules/app";

export function useAppSetting() {
  const appStore = useAppStore();

  // 获取是否显示配置按钮
  // Get whether to display the setting button
  const getShouldShowSettingButton = toRef(() => appStore.getProjectConfig.shouldShowSettingButton);

  // 获取是否显示主题切换按钮
  // Get whether to display the dark mode toggle button
  const getShouldShowDarkModeToggle = toRef(() => appStore.getProjectConfig.shouldShowDarkModeToggle);

  // 获取配置按钮显示位置
  // Get the position of the setting button display
  const getSettingButtonPosition = toRef(() => appStore.getProjectConfig.settingButtonPosition);

  // 获取权限模式
  // Get the permission mode
  const getPermissionMode = toRef(() => appStore.getProjectConfig.permissionMode);

  // 获取权限缓存类型
  // Get the permission cache type
  const getPermissionCacheType = toRef(() => appStore.getProjectConfig.permissionCacheType);

  // 获取会话超时处理方式
  // Get the session timeout processing method
  const getSessionTimeoutProcessing = toRef(() => appStore.getProjectConfig.sessionTimeoutProcessing);

  // 获取主界面全屏显示，不显示菜单和顶部
  // Get whether to display the main interface in full screen, without menu and top bar
  const getShouldShowFullContent = toRef(() => appStore.getProjectConfig.shouldShowFullContent);

  // 获取是否显示 logo
  // Get whether to display the logo
  const getShouldShowLogo = toRef(() => appStore.getProjectConfig.shouldShowLogo);

  // 获取是否显示全局底部
  // Get whether to display the global footer
  const getShouldShowFooter = toRef(() => appStore.getProjectConfig.shouldShowFooter);

  // 获取页面布局是否启用 keep-alive
  // Get whether to enable keep-alive for page layout
  const getShouldOpenKeepAlive = toRef(() => appStore.getProjectConfig.shouldOpenKeepAlive);

  // 获取锁屏时间
  // Get the lock screen time
  const getLockTime = toRef(() => appStore.getProjectConfig.lockTime);

  // 获取是否显示面包屑
  // Get whether to display the breadcrumb
  const getShouldShowBreadCrumb = toRef(() => appStore.getProjectConfig.shouldShowBreadCrumb);

  // 获取是否显示面包屑图标
  // Get whether to display the breadcrumb icon
  const getShouldShowBreadCrumbIcon = toRef(() => appStore.getProjectConfig.shouldShowBreadCrumbIcon);

  // 获取是否使用 error-handler-plugin
  // Get whether to use the error-handler-plugin
  const getShouldUseErrorHandle = toRef(() => appStore.getProjectConfig.shouldUseErrorHandle);

  // 获取是否开启返回顶部
  // Get whether to enable the back to top function
  const getShouldUseOpenBackTop = toRef(() => appStore.getProjectConfig.shouldUseOpenBackTop);

  // 获取是否可以嵌入 iframe 页面
  // Get whether to embed iframe pages
  const getCanEmbedIFramePage = toRef(() => appStore.getProjectConfig.canEmbedIFramePage);

  // 获取是否在切换界面时删除未关闭的消息并通知
  // Get whether to delete unclosed messages and notify when switching pages
  const getShouldCloseMessageOnSwitch = toRef(() => appStore.getProjectConfig.shouldCloseMessageOnSwitch);

  // 获取是否在切换界面时取消已发送但未响应的 http 请求
  // Get whether to cancel sent but unresponsive http requests when switching pages
  const getShouldRemoveAllHttpPending = toRef(() => appStore.getProjectConfig.shouldRemoveAllHttpPending);

  function getProjectConfig() {
    return appStore.getProjectConfig;
  }
  function setProjectConfig(config: DeepPartial<ProjectSetting>) {
    appStore.setProjectConfig(config);
  }

  return {
    getProjectConfig,
    setProjectConfig,
    getShouldShowSettingButton,
    getShouldShowDarkModeToggle,
    getSettingButtonPosition,
    getPermissionMode,
    getPermissionCacheType,
    getSessionTimeoutProcessing,
    getShouldShowFullContent,
    getShouldShowLogo,
    getShouldShowFooter,
    getShouldOpenKeepAlive,
    getLockTime,
    getShouldShowBreadCrumb,
    getShouldShowBreadCrumbIcon,
    getShouldUseErrorHandle,
    getShouldUseOpenBackTop,
    getCanEmbedIFramePage,
    getShouldCloseMessageOnSwitch,
    getShouldRemoveAllHttpPending,
  };
}
