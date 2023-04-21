<script setup lang="ts">
import type { Menu } from "@celeris/types";
import { CAUnoCSSIcon } from "@celeris/components";
import { mapTreeStructure } from "@celeris/utils";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { RouterLink } from "vue-router";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import { REDIRECT_NAME } from "~/router/constant";
import { getMenus } from "~/router/menus";
import { listenToRouteChange } from "~/router/mitt/routeChange";
const activeMenu = ref();
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
const transformProjectMenuToNaiveUIMenu = (menu: Menu) => {
  const { path, meta, icon, children } = menu;
  const renderIcon = (icon?: string) => {
    return () => h(CAUnoCSSIcon, { icon });
  };
  return {
    label: () => {
      if (children) {
        return meta?.title;
      }
      return h(
        RouterLink,
        {
          to: {
            path,
          },
        },
        { default: () => meta?.title },
      );
    },
    key: path,
    icon: renderIcon(icon || meta?.icon as string),
    collapseTitle: meta?.title,
  };
};

onMounted(() => {
  const menus = getMenus();
  menuList.value = mapTreeStructure(menus, menu => transformProjectMenuToNaiveUIMenu(menu));
});
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
