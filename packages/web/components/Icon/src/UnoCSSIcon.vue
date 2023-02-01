<script setup lang="ts">
withDefaults(
  defineProps<{ icon: string;size?: string }>(), {
    icon: "i-mdi-alert",
    size: "5",
  },
);
</script>

<template>
  <svg :class="`${icon} h-${size} w-${size}`" class="inline-block stroke-current" />
</template>

<style scoped>

</style>
