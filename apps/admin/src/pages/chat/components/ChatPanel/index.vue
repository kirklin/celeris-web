<script setup lang="ts">
import MessageInput from "~/pages/chat/components/ChatPanel/MessageInput.vue";
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
      <MessageInput />
    </template>
  </NSplit>
</template>

<style scoped>

</style>
