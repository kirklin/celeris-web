<script setup lang="ts">
import MessageInputArea from "./MessageInputArea/index.vue";
import ChatConversation from "~/pages/chat/components/ChatPanel/ChatConversation.vue";

defineOptions({
  name: "ChatPanel",
});
</script>

<template>
  <NSplit direction="vertical" :default-size="0.8">
    <template #1>
      <ChatConversation />
    </template>
    <template #2>
      <MessageInputArea />
    </template>
  </NSplit>
</template>

<style scoped>

</style>
