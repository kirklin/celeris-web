<script setup lang="ts">
import type { Menu } from "@celeris/types";
import { CAUnoCSSIcon } from "@celeris/components";
import { mapTreeStructure } from "@celeris/utils";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import { REDIRECT_NAME } from "~/router/constant";
import { getMenus } from "~/router/menus";
import { listenToRouteChange } from "~/router/mitt/routeChange";
import { usePermissionStore } from "~/store/modules/permission";

defineOptions({
  name: "MenuLayout",
});
const { te, t } = useI18n();
const activeMenu = ref();
const permissionStore = usePermissionStore();
const isCollapse = useMenuSetting().getCollapsed;
const { currentRoute } = useRouter();
const menuList = ref<any[]>([]);

listenToRouteChange((route) => {
  if (route.name === REDIRECT_NAME) {
    return;
  }
  const currentActiveMenu = route.meta?.currentActiveMenu;
  handleMenuChange(route as RouteLocationNormalizedLoaded);
  if (currentActiveMenu) {
    activeMenu.value = currentActiveMenu;
  }
});
async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute);
  activeMenu.value = menu.path;
}
const i18nRender = (key: string) => {
  return te(key) ? t(key) : key;
};

const transformProjectMenuToNaiveUIMenu = (menu: Menu) => {
  const { path, meta, icon, children } = menu;
  const renderIcon = (icon?: string) => {
    if (!icon) {
      return;
    }
    return () => h(CAUnoCSSIcon, { icon });
  };
  return {
    label: () => {
      if (children) {
        return i18nRender(meta?.title as string);
      }
      return h(
        RouterLink,
        {
          to: {
            path,
          },
        },
        { default: () => i18nRender(meta?.title as string) },
      );
    },
    key: path,
    icon: renderIcon(icon || meta?.icon as string),
    collapseTitle: i18nRender(meta?.title as string),
  };
};
// Generate menu
const generateMenu = () => {
  const menus = getMenus();
  menuList.value = mapTreeStructure(menus, menu => transformProjectMenuToNaiveUIMenu(menu));
};
// Menu changes
watch(
  [() => permissionStore.getLastMenuBuildTime, () => permissionStore.getBackendMenuList],
  () => {
    generateMenu();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div :class="isCollapse ? 'w-16' : 'w-64'" class="transition-width h-full shrink-0 flex-col overflow-hidden duration-75 lg:flex">
    <div class="my-auto flex h-16">
      <CAAppLogo :show-title="!isCollapse" />
    </div>
    <NScrollbar class="overflow-hidden">
      <NMenu v-model:value="activeMenu" :collapsed="isCollapse" :options="menuList" />
    </NScrollbar>
  </div>
</template>

<style scoped lang="scss">
</style>
