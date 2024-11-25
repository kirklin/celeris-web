<script setup lang="ts">
import type { Menu } from "@celeris/types";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { renderIcon } from "@celeris/components";
import { mapTreeStructure } from "@celeris/utils";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { REDIRECT_NAME } from "~/router/constant";
import { getMenus } from "~/router/menus";
import { listenToRouteChange } from "~/router/mitt/routeChange";
import { usePermissionStore } from "~/store/modules/permission";

defineOptions({
  name: "MenuLayout",
});
const props = withDefaults(
  defineProps<{
    mode?: "vertical" | "horizontal";
    collapsed?: boolean;
  }>(),
  { mode: "vertical", collapsed: false },
);
const { mode, collapsed } = toRefs(props);

const { te, t } = useI18n();
const activeMenu = ref();
const permissionStore = usePermissionStore();
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
function i18nRender(key: string) {
  return te(key) ? t(key) : key;
}

function transformProjectMenuToNaiveUIMenu(menu: Menu) {
  const { path, meta, icon, children } = menu;
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
}
// Generate menu
function generateMenu() {
  const menus = getMenus();
  menuList.value = mapTreeStructure(menus, menu => transformProjectMenuToNaiveUIMenu(menu));
}
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
const collapsedWidth = computed<number>(() => collapsed.value ? 56 : 224);
</script>

<template>
  <div :class="collapsed ? 'w-14' : 'w-60'" class="transition-width h-full shrink-0 flex-col overflow-hidden duration-90">
    <NScrollbar class="max-h-[calc(100vh_-_4rem)]">
      <NMenu
        v-model:value="activeMenu"
        :collapsed="collapsed"
        :root-indent="20"
        :indent="12"
        :collapsed-width="collapsedWidth"
        :mode="mode" :options="menuList"
      />
    </NScrollbar>
  </div>
</template>

<style scoped>
</style>
