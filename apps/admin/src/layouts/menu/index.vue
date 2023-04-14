<script setup lang="ts">
import type { Menu } from "@celeris/types";
import { CAUnoCSSIcon } from "@celeris/components";
import { mapTreeStructure } from "@celeris/utils";
import { RouterLink } from "vue-router";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import { getMenus } from "~/router/menus";
const route = useRoute();
const activeMenu = computed((): string => route.path);
const isCollapse = useMenuSetting().getCollapsed;

const menuList = ref([]);
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
    icon: renderIcon(icon || meta?.icon),
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
      <NMenu :collapsed="isCollapse" :default-value="activeMenu" :options="menuList" />
    </NScrollbar>
  </div>
</template>

<style scoped lang="scss">
</style>
