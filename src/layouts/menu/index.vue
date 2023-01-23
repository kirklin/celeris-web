<script setup lang="ts">
import { menus } from "./data";
import AppLogo from "~/components/Application/src/AppLogo.vue";
import type { MenuOptions } from "~/layouts/menu/types";
import SubItem from "~/layouts/menu/compoents/SubItem.vue";
const route = useRoute();
const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => false);

const menuList: MenuOptions[] = reactive<MenuOptions[]>(menus);
</script>

<template>
  <div :class="isCollapse ? 'w-32' : 'w-64'" class="transition-width fixed top-0 left-0 z-20 h-full shrink-0 flex-col border duration-75 lg:flex">
    <div class="m-1">
      <AppLogo />
    </div>
    <el-menu
      :default-active="activeMenu"
      :router="false"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
      background-color=""
      text-color="#111827"
      class=""
    >
      <SubItem :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.ca-menu {
  overflow: auto;
  overflow-x: hidden;
  border-right: none;
}
</style>
