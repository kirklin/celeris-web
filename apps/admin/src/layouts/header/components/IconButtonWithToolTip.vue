<script setup lang="ts">
import ToolTipper from "~/layouts/header/components/ToolTipper.vue";

withDefaults(
  defineProps<{ tooltipText?: string;icon: string;color: string }>(), {
    tooltipText: "icon Button",
    icon: "i-mdi-alert ",
    color: "gray",
  },
);
</script>

<template>
  <ToolTipper :tooltip-text="tooltipText">
    <button
      type="button" :class="`bg-${color}-50 text-${color}-900 w-8 h-8 text-base flex items-center justify-center rounded-lg p-2
      hover:bg-${color}-200 hover:text-${color}-900`"
    >
      <span class="sr-only">{{ tooltipText }}</span>
      <svg :class="`${icon}`" />
    </button>
  </ToolTipper>
</template>

<style scoped>

</style>
