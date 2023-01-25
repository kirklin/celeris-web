<script setup lang="ts">
withDefaults(
  defineProps<{ srOnly?: string;icon: string;color: string;size: string }>(), {
    srOnly: "icon Button",
    icon: "i-mdi-alert ",
    color: "gray",
    size: "5",
  },
);
</script>

<template>
  <button type="button" :class="`bg-${color}-50 text-${color}-900 hover:bg-${color}-200 hover:text-${color}-900 dark:text-${color}-400 dark:hover:bg-${color}-700 rounded-lg p-2 dark:hover:text-white`">
    <span class="sr-only">{{ srOnly }}</span>
    <svg :class="`${icon} h-${size} w-${size}`" />
  </button>
</template>

<style scoped>

</style>
