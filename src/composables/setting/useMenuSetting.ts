import type { MenuSetting } from "../../../types/config";
import { useAppStore } from "~/store/modules/app";

export function useMenuSetting() {
  const appStore = useAppStore();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,
    getCollapsed,
    toggleCollapsed,
  };
}
