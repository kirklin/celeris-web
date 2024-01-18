<script lang="ts" setup>
defineOptions({
  name: "SidebarHeader",
});

const props = defineProps<{
  collapsed?: boolean;
}>();
const { collapsed } = toRefs(props);
</script>

<template>
  <div class="my-auto flex h-16">
    <CAAppLogo :display-title="!collapsed" />
  </div>
</template>

<style scoped>
</style>
