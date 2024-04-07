<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ChatHistorySidebar } from "~/pages/chat/components/AssistantSidebar/types";
import ChatHistoryItem from "~/pages/chat/components/ChatHistorySidebar/components/ChatHistoryItem.vue";

const chatHistory = ref<ChatHistorySidebar>(); // 使用 ChatHistorySidebar 类型的 ref

// 模拟在组件挂载时获取或设置初始数据
onMounted(() => {
  // 这里可以替换为实际获取聊天历史摘要的逻辑
  chatHistory.value = {
    assistantId: "1", // 设置相关联的聊天助手 ID
    chatSummaries: [
      { id: "1", assistantId: "1", title: "Chat with Customer Support", archived: false },
      { id: "2", assistantId: "1", title: "Product Inquiry", archived: false },
      { id: "3", assistantId: "1", title: "Technical Assistance", archived: false },
      { id: "4", assistantId: "1", title: "Sales Meeting", archived: false },
      // 添加更多聊天摘要条目
    ],
  };
});
</script>

<template>
  <NCollapse :default-expanded-names="['history']" arrow-placement="left" class="chat-history-list">
    <NCollapseItem title="历史信息" name="history">
      <template #header-extra>
        <NBadge :value="chatHistory?.chatSummaries.length" :max="99" :offset="[0, 0]" color="transparent" />
      </template>
      <NScrollbar class="max-h-full p-1">
        <div class="flex flex-col text-sm overflow-hidden">
          <template v-if="!chatHistory?.chatSummaries.length">
            <!-- 如果没有聊天摘要，显示空状态 -->
            <div class="flex flex-col items-center mt-4 text-center">
              <NEmpty />
            </div>
          </template>
          <template v-else>
            <!-- 渲染聊天历史摘要列表 -->
            <div
              v-for="chatSummary in chatHistory?.chatSummaries" :key="chatSummary.id"
              class="cursor-pointer flex items-center w-full overflow-hidden transition ease-out border-[var(--border-color)]"
            >
              <ChatHistoryItem :chat-summary="chatSummary" />
            </div>
          </template>
        </div>
      </NScrollbar>
    </NCollapseItem>
  </NCollapse>
</template>

<style scoped>
.chat-history-list :deep(.ca-collapse-item__header) {
  @apply pl-4;
}
</style>
