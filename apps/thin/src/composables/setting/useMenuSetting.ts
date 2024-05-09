import type { MenuSetting } from "@celeris/types";
import { useAppStoreWithOut } from "~/store/modules/app";

export function useMenuSetting() {
  const appStore = useAppStoreWithOut();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  function getMenuSetting() {
    return appStore.getMenuSetting;
  }

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectSetting({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    getMenuSetting,
    setMenuSetting,
    getCollapsed,
    toggleCollapsed,
  };
}
