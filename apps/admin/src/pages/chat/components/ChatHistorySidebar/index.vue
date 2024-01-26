<script setup lang="ts">
import ChatHistorySidebarActionBar
  from "~/pages/chat/components/ChatHistorySidebar/components/ChatHistorySidebarActionBar.vue";
import ChatList from "~/pages/chat/components/ChatHistorySidebar/components/ChatList.vue";

defineOptions({
  name: "ChatHistorySidebar",
});
</script>

<template>
  <div class="flex flex-col">
    <ChatHistorySidebarActionBar />
    <ChatList />
  </div>
</template>

<style scoped>

</style>
