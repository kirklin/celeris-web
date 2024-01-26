<script lang="ts" setup>
defineOptions({
  name: "SidebarFooter",
});

withDefaults(
  defineProps<{
    collapsed?: boolean;
  }>(),
  { collapsed: false },
);
</script>

<template>
  <div class="sidebar-footer" :class="{ collapsed }" />
</template>

<style scoped>

</style>
