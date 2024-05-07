<script setup lang="ts">

</script>

<template>
  <div class="page-wrapper rounded-2xl w-full h-full min-h-full">
    <slot />
  </div>
</template>

<style scoped>
.page-wrapper :deep(.ca-scrollbar-container) {
  padding: 0 8px;
}
</style>
