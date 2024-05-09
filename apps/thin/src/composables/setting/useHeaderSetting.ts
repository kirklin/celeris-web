import type { HeaderSetting } from "@celeris/types";
import { useAppStoreWithOut } from "~/store/modules/app";

export function useHeaderSetting() {
  const appStore = useAppStoreWithOut();

  // 获取是否显示网站头部
  // Get whether to show the website header
  const getShouldShowHeader = computed(() => appStore.getHeaderSetting.shouldShow);

  // 获取是否显示全屏按钮
  // Get whether to show the full screen button
  const getShouldShowFullScreen = computed(() => appStore.getHeaderSetting.shouldShowFullScreen);

  // 获取是否显示搜索
  // Get whether to show the search
  const getShouldShowSearch = computed(() => appStore.getHeaderSetting.shouldShowSearch);

  // 获取是否显示通知
  // Get whether to show the notice
  const getShouldShowNotice = computed(() => appStore.getHeaderSetting.shouldShowNotice);

  // 获取是否显示设置抽屉
  // Get whether to show the setting drawer
  const getShouldShowSettingDrawer = computed(() => appStore.getHeaderSetting.shouldShowSettingDrawer);

  const setShouldShowSettingDrawer = (shouldShowSettingDrawer: boolean) => {
    appStore.setHeaderSetting({ shouldShowSettingDrawer });
  };

  const toggleShouldShowSettingDrawer = () => {
    setShouldShowSettingDrawer(!getShouldShowSettingDrawer.value);
  };

  function getHeaderSetting() {
    return appStore.getHeaderSetting;
  }
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setHeaderSetting(headerSetting);
  }

  return {
    getHeaderSetting,
    setHeaderSetting,
    getShouldShowHeader,
    getShouldShowFullScreen,
    getShouldShowSearch,
    getShouldShowNotice,
    getShouldShowSettingDrawer,
    setShouldShowSettingDrawer,
    toggleShouldShowSettingDrawer,
  };
}
