<script setup lang="ts">
import type { RendererElement, RendererNode, VNode } from "vue";
import { renderIcon } from "@celeris/components";
import type { ChatContextInjectionKey } from "~/pages/chat/chatContext";
import { chatContextInjectionKey } from "~/pages/chat/chatContext";

const { selectedAssistantRef } = inject<ChatContextInjectionKey>(chatContextInjectionKey)!;
const TrashIcon = "carbon:trash-can";
const MenuHorizontalIcon = "carbon:overflow-menu-horizontal";
const SHARE_ICON = "tabler:share";
const ExportIcon = "tabler:download";
interface MenuItem {
  label: string;
  key: string;
  icon?: () => VNode<RendererNode, RendererElement, { [key: string]: any }>;
}
const menuItems: MenuItem[] = [
  {
    label: "Export Session",
    key: "Export",
    icon: renderIcon(ExportIcon),
  },
  {
    label: "Delete",
    key: "Delete",
    icon: renderIcon(TrashIcon),
  },
];
const menuOptions = ref<MenuItem[]>(menuItems);
</script>

<template>
  <div class="chat-panel-toolbar flex grow items-center sticky backdrop-blur pb-2">
    <div class="assistant flex items-center grow">
      <div
        class="flex items-center mr-2"
        :class="{ 'state-online': selectedAssistantRef.id === '0' }"
      >
        <NAvatar round size="large" :src="selectedAssistantRef.avatar" />
      </div>
      <div class="info flex flex-col">
        <div class="name font-bold">
          {{ selectedAssistantRef.name }}
        </div>
        <div class="description">
          {{ selectedAssistantRef.description }}
        </div>
      </div>
    </div>

    <div class="actions-groups flex items-center gap-4 opacity-80 mr-4">
      <NButton text>
        <CAIcon :name="SHARE_ICON" :size="20" />
      </NButton>
    </div>
    <div class="menu-options flex justify-center opacity-80">
      <NDropdown :options="menuOptions">
        <NButton text>
          <CAIcon :name="MenuHorizontalIcon" :size="24" />
        </NButton>
      </NDropdown>
    </div>
  </div>
</template>

<style scoped>
.chat-panel-toolbar {
  position: sticky;
  top: 0;
  left: 0;
  backdrop-filter: blur(15px);
  width: 100%;
  max-width: 100%;
  z-index: 10;
}
</style>
