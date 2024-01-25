<script setup lang="ts">
import AssistantSidebarActionBar from "./components/AssistantSidebarActionBar.vue";
import RoleList from "~/pages/chat/components/AssistantSidebar/components/AssistantList.vue";

defineOptions({
  name: "AssistantSidebar",
});
</script>

<template>
  <AssistantSidebarActionBar />
  <RoleList />
</template>

<style scoped>

</style>
