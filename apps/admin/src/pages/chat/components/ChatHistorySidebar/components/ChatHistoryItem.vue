<script setup lang="ts">
import { renderIcon } from "@celeris/components";
import type { RendererElement, RendererNode, VNode } from "vue";
import type { ChatSummary } from "~/pages/chat/components/AssistantSidebar/types";
import ActionIcon from "~/component/ActionIcon/src/ActionIcon.vue";

defineProps({
  chatSummary: {
    type: Object as () => ChatSummary,
    required: true,
  },
});

const showActions = ref(false);

const TrashIcon = "carbon:trash-can";
const MenuHorizontalIcon = "carbon:overflow-menu-horizontal";
const ExportIcon = "tabler:download";
const EditIcon = "tabler:edit";
const ArchiveIcon = "tabler:archive";

interface MenuItem {
  label: string;
  key: string;
  icon?: () => VNode<RendererNode, RendererElement, { [key: string]: any }>;
}
const menuItems: MenuItem[] = [
  {
    label: "导出",
    key: "Export",
    icon: renderIcon(ExportIcon),
  },
  {
    label: "重命名",
    key: "Edit",
    icon: renderIcon(EditIcon),
  },
  {
    label: "删除",
    key: "Delete",
    icon: renderIcon(TrashIcon),
  },
];
const menuOptions = ref<MenuItem[]>(menuItems);
</script>

<template>
  <div class="w-full rounded-lg transition ease-out flex mx-2 px-2 py-1.5 hover:bg-[var(--hover-color)]" @mouseover="showActions = true" @mouseleave="showActions = false">
    <div class="overflow-hidden flex flex-col grow gap-1 p-1.5">
      <NText class="description text-ellipsis">
        {{ chatSummary.title }}
      </NText>
    </div>
    <!-- 显示操作组 -->
    <div v-show="showActions" class="chat-history-item-actions-group flex gap-x-2">
      <div class="menu-options flex justify-center opacity-80">
        <NDropdown :options="menuOptions">
          <NButton text>
            <CAIcon :name="MenuHorizontalIcon" :size="20" />
          </NButton>
        </NDropdown>
      </div>
      <ActionIcon tooltip-text="归档" :icon="ArchiveIcon" :size="20" transparent />
    </div>
  </div>
</template>

<style scoped>
</style>
