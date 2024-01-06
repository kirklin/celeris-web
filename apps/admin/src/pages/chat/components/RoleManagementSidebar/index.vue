<script setup lang="ts">
import RoleManagementSidebarActionBar from "./components/RoleManagementSidebarActionBar.vue";
import RoleList from "~/pages/chat/components/RoleManagementSidebar/components/RoleList.vue";

defineOptions({
  name: "RoleManagementSidebar",
});
</script>

<template>
  <RoleManagementSidebarActionBar />
  <RoleList />
</template>

<style scoped>

</style>
