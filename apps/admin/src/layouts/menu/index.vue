<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { menus } from "./data";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
const route = useRoute();
const router = useRouter();
const activeMenu = computed((): string => route.path);
const isCollapse = useMenuSetting().getCollapsed;

const menuList = reactive<MenuOption[]>(menus);
function handleMenuSelect(key, item) {
  router.push(item.path);
}
</script>

<template>
  <div :class="isCollapse ? 'w-16' : 'w-64'" class="transition-width h-full shrink-0 flex-col overflow-hidden duration-75 lg:flex">
    <div class="my-auto flex h-16">
      <CAAppLogo :show-title="!isCollapse" />
    </div>
    <NScrollbar>
      <NMenu :collapsed="isCollapse" :default-value="activeMenu" :options="menuList" @update:value="handleMenuSelect" />
    </NScrollbar>
  </div>
</template>

<style scoped lang="scss">
</style>
