<script setup lang="ts">
interface PageWrapperProps {
  useScrollbar?: boolean;
}

withDefaults(defineProps<PageWrapperProps>(), {
  useScrollbar: true,
});
</script>

<template>
  <div class="page-wrapper" :class="[{ 'scrollbar-enabled': useScrollbar }]">
    <NScrollbar v-if="useScrollbar" class="rounded-2xl">
      <slot />
    </NScrollbar>
    <slot v-else />
  </div>
</template>

<style scoped>
.page-wrapper {
  /* Default styles for page-wrapper */
  @apply rounded-2xl w-full h-full min-h-full;
}

.page-wrapper.scrollbar-enabled {
  /* Styles specific to when scrollbar is enabled */
  width: calc(100% + 8px);
}

.page-wrapper.scrollbar-enabled :deep(.ca-scrollbar-container) {
  width: calc(100% - 8px);
  @apply rounded-2xl;
}
</style>
