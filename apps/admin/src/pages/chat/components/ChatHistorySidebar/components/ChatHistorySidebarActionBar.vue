<script setup lang="ts">
import type { ChatContextInjectionKey } from "~/pages/chat/chatContext";
import { chatContextInjectionKey } from "~/pages/chat/chatContext";
import ActionIcon from "~/component/ActionIcon/src/ActionIcon.vue";

const { selectedAssistantRef } = inject<ChatContextInjectionKey>(chatContextInjectionKey)!;
</script>

<template>
  <NCollapse :default-expanded-names="['info']" arrow-placement="left" class="p-4 chat-history-action">
    <NCollapseItem title="助手信息" name="info">
      <NCard embedded :bordered="false">
        <NCard :bordered="false">
          <div class="w-full rounded-2xl flex mx-2 px-2 py-1 justify-between">
            <div class="relative rounded-full flex items-center pb-1 pr-2" :class="{ available: selectedAssistantRef.available }">
              <NAvatar round :src="selectedAssistantRef.avatar" size="large" />
            </div>
            <div class="overflow-hidden flex justify-between items-center ">
              <div class="name whitespace-nowrap text-ellipsis grow font-bold">
                {{ selectedAssistantRef.name }}
              </div>
            </div>
            <div class="flex flex-y-center">
              <ActionIcon icon="tabler:edit" tooltip-text="编辑助手" />
            </div>
          </div>
          <div class="overflow-hidden flex flex-col grow gap-2 p-2">
            <NText class="prompt text-ellipsis">
              {{ selectedAssistantRef.prompt }}
            </NText>
          </div>
        </NCard>
        <template #footer>
          <NCard :bordered="false">
            <!--            <div class="description text-ellipsis p-2"> -->
            <!--              {{ selectedRoleRef.description }} -->
            <!--            </div> -->
            <div class="flex flex-row justify-between">
              <div class="flex flex-row flex-y-center">
                <div class="flex flex-y-center mr-2">
                  <ActionIcon icon="tabler:thumb-up-filled" tooltip-text="点赞" />
                </div>
                <NText>
                  {{ selectedAssistantRef.likes }}
                </NText>
              </div>
              <div class="flex flex-y-center">
                <div class="flex flex-row flex-y-center">
                  <div class="flex flex-y-center mr-2">
                    <ActionIcon icon="tabler:thumb-down-filled" tooltip-text="踩" />
                  </div>
                  <NText>
                    {{ selectedAssistantRef.dislikes }}
                  </NText>
                </div>
              </div>
              <div class="flex flex-y-center">
                <div class="flex flex-row flex-y-center">
                  <div class="flex flex-y-center mr-2">
                    <ActionIcon icon="tabler:share" tooltip-text="分享" />
                  </div>
                  <NText>
                    {{ selectedAssistantRef.shares }}
                  </NText>
                </div>
              </div>
            </div>
          </NCard>
        </template>
      </NCard>
    </NCollapseItem>
  </NCollapse>
</template>

<style scoped>
.chat-history-action :deep(.ca-card) > .ca-card__content,
:deep(.ca-card) > .ca-card__footer {
  box-sizing: border-box;
  padding: 0 calc(var(--n-padding-left) / 2) calc(var(--n-padding-bottom) / 2)
    calc(var(--n-padding-left) / 2);
}
.chat-history-action :deep(.ca-card) > .ca-card__content:first-child,
:deep(.ca-card) > .ca-card__footer:first-child {
  padding-top: calc(var(--n-padding-bottom) / 2);
}
</style>
