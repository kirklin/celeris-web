<script setup lang="ts">
import type { MenuOptions } from "~/layouts/menu/types";

defineProps<{ menuList: MenuOptions[] }>();
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.id">
    <ElSubMenu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <ElIcon>
          <Component :is="subItem.icon" />
        </ElIcon>
        <span>{{ subItem.title }}</span>
      </template>
      <SubItem :menu-list="subItem.children" />
    </ElSubMenu>
    <ElMenuItem v-else :index="subItem.path">
      <ElIcon>
        <Component :is="subItem.icon" />
      </ElIcon>
      <template #title>
        <span>{{ subItem.title }}</span>
      </template>
    </ElMenuItem>
  </template>
</template>

<style scoped lang="scss">
</style>
