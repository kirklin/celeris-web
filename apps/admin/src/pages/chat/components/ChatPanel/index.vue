<script setup lang="ts">
import MessageInputArea from "./MessageInputArea/index.vue";
import ChatConversation from "./ChatConversation.vue";
import ChatPanelToolbar from "~/pages/chat/components/ChatPanel/ChatPanelToolbar.vue";

defineOptions({
  name: "ChatPanel",
});

const chatWrapperRef = ref();
const toolbarRef = ref();

const { height: wrapperHeight } = useElementSize(chatWrapperRef);
const { height: toolbarHeight } = useElementSize(toolbarRef);

const throttledWrapperHeight = refThrottled(wrapperHeight, 60);

const maxChatPanelHeight = computed(() => {
  return throttledWrapperHeight.value - toolbarHeight.value;
});
</script>

<template>
  <NSplit direction="vertical" :default-size="0.8">
    <template #1>
      <ChatPanelToolbar ref="toolbarRef" class="overflow-hidden" />
      <div ref="chatWrapperRef" class="w-full h-full flex flex-col">
        <div class=" common-bg dark:bg-[--action-color] rounded-2xl">
          <ChatConversation :max-height="maxChatPanelHeight" />
        </div>
      </div>
    </template>
    <template #2>
      <MessageInputArea />
    </template>
  </NSplit>
</template>

<style scoped>

</style>
