<script setup lang="ts">
interface PageWrapperProps {
  useScrollbar?: boolean;
}

withDefaults(defineProps<PageWrapperProps>(), {
  useScrollbar: true,
});
</script>

<template>
  <div class="page-wrapper rounded-2xl w-full h-full min-h-full">
    <NScrollbar v-if="useScrollbar" content-class="scrollbar-content" class="rounded-2xl">
      <slot />
    </NScrollbar>
    <slot v-else />
  </div>
</template>

<style scoped>
/*
  TODO: Explore alternative methods for styling the scrollbar within the pageWrapper component.
 */
/*
  Enhance scrollbar appearance within the pageWrapper container to maintain content visibility
*/
.page-wrapper {
  width: calc(100% + 8px);
}

.page-wrapper :deep(.scrollbar-content) {
  padding-right: 8px;
}
</style>
