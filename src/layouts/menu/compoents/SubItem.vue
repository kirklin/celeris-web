<script setup lang="ts">
import type { MenuOptions } from "~/layouts/menu/types";

defineProps<{ menuList: MenuOptions[] }>();
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.id">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <el-icon>
          <component :is="subItem.icon" />
        </el-icon>
        <span>{{ subItem.title }}</span>
      </template>
      <SubItem :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path">
      <el-icon>
        <component :is="subItem.icon" />
      </el-icon>
      <template #title>
        <span>{{ subItem.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
</style>
