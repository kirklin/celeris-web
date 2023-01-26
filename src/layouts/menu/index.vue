<script setup lang="ts">
import { menus } from "./data";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import AppLogo from "~/components/Application/src/AppLogo.vue";
import type { MenuOptions } from "~/layouts/menu/types";
import SubItem from "~/layouts/menu/compoents/SubItem.vue";
const route = useRoute();
const activeMenu = computed((): string => route.path);
const isCollapse = useMenuSetting().getCollapsed;

const menuList: MenuOptions[] = reactive<MenuOptions[]>(menus);
</script>

<template>
  <div :class="isCollapse ? 'w-16' : 'w-64'" class="transition-width h-full shrink-0 flex-col overflow-hidden duration-75 lg:flex">
    <div class="my-auto flex h-16">
      <AppLogo :show-title="!isCollapse" />
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <SubItem :menu-list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.#{$namespace}-menu {
  overflow: auto;
  overflow-x: hidden;
  border-right: none;
}
</style>
