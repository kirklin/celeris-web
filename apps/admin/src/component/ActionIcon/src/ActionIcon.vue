<script setup lang="ts">
import ToolTipper from "./ToolTipper.vue";

withDefaults(
  defineProps<{
    tooltipText?: string;
    icon: string;
    transparent?: boolean; // 是否设置背景透明
    size?: number; // 按钮大小
  }>(),
  {
    tooltipText: undefined,
    icon: "i-mdi-alert",
    transparent: false, // 是否设置背景透明
    size: 16, // 按钮大小
  },
);
</script>

<template>
  <ToolTipper :tooltip-text="tooltipText">
    <NEl
      tag="button" type="button" class="text-[var(--text-color-base)] w-8 h-8 text-base flex items-center justify-center rounded-lg p-2 cursor-pointer
      hover:bg-[var(--hover-color)]"
      :class="{ 'bg-[var(--action-color)]': !transparent, 'bg-transparent': transparent }"
    >
      <span class="sr-only">{{ tooltipText }}</span>
      <CAIcon :icon="icon" :size="size" />
    </NEl>
  </ToolTipper>
</template>

<style scoped>

</style>
