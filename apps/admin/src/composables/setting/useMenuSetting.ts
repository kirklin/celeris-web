import type { MenuSetting } from "@celeris/types";
import { useAppStore } from "~/store/modules/app";

export function useMenuSetting() {
  const appStore = useAppStore();

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
