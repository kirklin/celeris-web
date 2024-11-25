<script setup lang="ts">
import RoleList from "~/pages/chat/components/AssistantSidebar/components/AssistantList.vue";
import AssistantSidebarActionBar from "./components/AssistantSidebarActionBar.vue";

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
