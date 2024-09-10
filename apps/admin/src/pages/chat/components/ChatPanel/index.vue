<script setup lang="ts">
import MessageInputArea from "./MessageInputArea/index.vue";
import ChatConversation from "./ChatConversation.vue";
import ChatPanelToolbar from "~/pages/chat/components/ChatPanel/ChatPanelToolbar.vue";

defineOptions({
  name: "ChatPanel",
});

const chatWrapperRef = resolveRef(null);
const toolbarRef = resolveRef(null);

const { height: wrapperHeight } = useElementSize(chatWrapperRef);
const { height: toolbarHeight } = useElementSize(toolbarRef);

const throttledWrapperHeight = refThrottled(wrapperHeight, 60);

const maxChatPanelHeight = computed(() => {
  return throttledWrapperHeight.value - toolbarHeight.value - 15;
});
</script>

<template>
  <NSplit direction="vertical" :default-size="0.8">
    <template #1>
      <ChatPanelToolbar ref="toolbarRef" class="overflow-hidden" />
      <div ref="chatWrapperRef" class="w-full h-full flex flex-col">
        <div class="w-full common-bg dark:bg-[--action-color] rounded-2xl" :style="{ height: `${maxChatPanelHeight}px` }">
          <ChatConversation :max-height="maxChatPanelHeight" />
        </div>
      </div>
    </template>
    <template #2>
      <MessageInputArea />
    </template>
    <template #resize-trigger>
      <div
        class="resize-trigger h-full flex justify-center items-center rounded-md bg-transparent hover:bg-[--primary-color] transition-colors duration-300"
      />
    </template>
  </NSplit>
</template>

<style scoped>

</style>
