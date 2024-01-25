<script setup lang="ts">
import ChatInputActionBar from "~/pages/chat/components/ChatPanel/MessageInputArea/ChatInputActionBar.vue";
import ChatInputAreaInner from "~/pages/chat/components/ChatPanel/MessageInputArea/ChatInputAreaInner.vue";
import SendMessageButton from "~/pages/chat/components/ChatPanel/MessageInputArea/SendMessageButton.vue";
</script>

<template>
  <div class="h-full w-full flex flex-col py-2">
    <div class="mb-1">
      <ChatInputActionBar />
    </div>
    <ChatInputAreaInner />
    <div class="flex mt-1">
      <div class="flex-1" />
      <SendMessageButton />
    </div>
  </div>
</template>

<style scoped>

</style>
