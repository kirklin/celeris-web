<script setup lang="ts">
import ChatHistorySidebar from "./ChatHistorySidebar/index.vue";
import ChatPanel from "./ChatPanel/index.vue";
import AssistantSidebar from "./AssistantSidebar/index.vue";
import { chatContextInjectionKey } from "~/pages/chat/chatContext";
import { defaultAssistant } from "~/pages/chat/data";

provide(chatContextInjectionKey, {
  selectedAssistantRef: ref(defaultAssistant),
});
</script>

<template>
  <!-- 采用了分栏布局，包括一个左侧边栏和一个右侧边栏，以及一个中央面板。
左侧边栏是用于管理系统助手的区域，允许用户创建、编辑和删除系统助手。
右侧边栏显示了每个助手的聊天记录，并且可以根据用户选择的助手动态加载相应的聊天记录。
中央面板则用于展示选定助手的实时对话界面，可能包含一个消息输入框以及用于加载历史对话记录的功能。 -->
  <NLayout has-sider sider-placement="left" class="chat-layout h-full rounded-2xl">
    <NLayoutSider
      collapse-mode="transform"
      :collapsed-width="0"
      :width="360"
      :native-scrollbar="true"
      show-trigger="arrow-circle"
      bordered
    >
      <AssistantSidebar />
    </NLayoutSider>
    <NLayoutContent>
      <NLayout has-sider sider-placement="right" class="h-full">
        <NLayoutContent content-class="p-4">
          <ChatPanel />
        </NLayoutContent>
        <NLayoutSider
          collapse-mode="transform"
          :collapsed-width="0"
          :width="360"
          :native-scrollbar="true"
          show-trigger="arrow-circle"
          bordered
        >
          <ChatHistorySidebar />
        </NLayoutSider>
      </NLayout>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>

</style>
