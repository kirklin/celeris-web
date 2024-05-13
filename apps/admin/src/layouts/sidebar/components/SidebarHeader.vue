<script lang="ts" setup>
defineOptions({
  name: "SidebarHeader",
});

const props = defineProps<{
  collapsed?: boolean;
}>();
const { collapsed } = toRefs(props);

// 计算属性，获取应用程序名称
const applicationName = computed(() => String(import.meta.env.VITE_GLOB_APP_TITLE));
</script>

<template>
  <div class="my-auto flex h-16">
    <CAAppLogo :display-title="!collapsed" :application-name="applicationName" />
  </div>
</template>

<style scoped>
</style>
