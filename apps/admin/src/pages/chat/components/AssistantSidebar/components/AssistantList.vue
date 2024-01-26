<script setup lang="ts">
import type { Assistant } from "~/pages/chat/components/AssistantSidebar/types";
import AssistantItem from "~/pages/chat/components/AssistantSidebar/components/AssistantItem.vue";
import { type ChatContextInjectionKey, chatContextInjectionKey } from "~/pages/chat/chatContext";
import { defaultAssistant, fakeAssistants } from "~/pages/chat/data";

const { selectedAssistantRef } = inject<ChatContextInjectionKey>(chatContextInjectionKey)!;
function handleSelectedRole(assistant: Assistant) {
  selectedAssistantRef.value = assistant;
}
</script>

<template>
  <div class="contacts-list">
    <NEl
      class="cursor-pointer flex items-center w-full pb-1 overflow-hidden transition ease-out hover:bg-[var(--hover-color)]"
    >
      <AssistantItem :assistant="defaultAssistant" @click="handleSelectedRole(defaultAssistant)" />
    </NEl>
    <NCollapse :default-expanded-names="['default']" arrow-placement="left">
      <NCollapseItem title="默认列表" name="default">
        <NEl
          v-for="assistant of fakeAssistants"
          :key="assistant.id"
          class="cursor-pointer flex items-center w-full overflow-hidden transition ease-out border-b-1 border-solid border-[var(--border-color)] hover:bg-[var(--hover-color)]"
        >
          <AssistantItem :assistant="assistant" @click="handleSelectedRole(assistant)" />
        </NEl>
      </NCollapseItem>
    </NCollapse>
  </div>
</template>

<style scoped>
.contacts-list :deep(.ca-collapse-item__header) {
  padding-left: 0.5rem;
}
</style>
