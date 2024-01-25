<script setup lang="ts">
import type { UserInfo } from "@celeris/types";
import type { VirtualListInst } from "naive-ui";
import { useUserStore } from "~/store/modules/user";
import type { ChatContextInjectionKey } from "~/pages/chat/chatContext";
import { chatContextInjectionKey } from "~/pages/chat/chatContext";

defineProps({
  maxHeight: {
    type: Number,
  },
});
const { userInfo } = useUserStore();
const conversationsVirtualListInst = ref<VirtualListInst>();
const { selectedAssistantRef } = inject<ChatContextInjectionKey>(chatContextInjectionKey)!;
interface Message {
  text: string;
  date: Date;
}

interface Conversation {
  id: number;
  user: UserInfo | null;
  isMine: boolean;
  messages: Message[];
  date: Date;
}

function generateFakeData(): Conversation[] {
  const fakeData: Conversation[] = [];

  for (let i = 0; i <= 50; i++) {
    const isMine: boolean = i % 2 === 0;

    const conversation: Conversation = {
      id: i,
      user: i % 2 === 0 ? userInfo : { id: selectedAssistantRef.value.id, username: selectedAssistantRef.value.name, avatarUrl: selectedAssistantRef.value.avatar },
      isMine,
      messages: [],
      date: new Date(),
    };

    const message: Message = {
      text: generateRandomText(),
      date: new Date(),
    };
    conversation.messages.push(message);

    fakeData.push(conversation);
  }

  return fakeData;
}

function generateRandomText(): string {
  const words: string[] = ["Hello", "How", "Are", "You", "Doing", "Today", "Good", "Morning", "Afternoon", "Evening"];
  const text: string[] = [];

  for (let i = 0; i < 5; i++) {
    const randomIndex: number = Math.floor(Math.random() * words.length);
    text.push(words[randomIndex]);
  }

  return text.join(" ");
}

const conversations: Conversation[] = generateFakeData();
onMounted(() => {
  nextTick(() => {
    conversationsVirtualListInst.value?.scrollTo({ position: "bottom" });
  });
});
</script>

<template>
  <NVirtualList
    ref="conversationsVirtualListInst"
    :style="{ maxHeight: `${maxHeight}px` }"
    :item-size="conversations.length"
    :items="conversations"
    class="chat-virtual-list"
    item-resizable
  >
    <template #default="{ item, index }">
      <div
        :key="index" class="conversation flex"
        :class="{ mine: item.isMine }"
      >
        <div class="avatar">
          <NAvatar round size="large" :src="item.user.avatarUrl" />
        </div>
        <div class="messages flex flex-col">
          <div v-for="message of item.messages" :key="message.text" class="message">
            {{ message.text }}
          </div>
          <div class="date">
            <NTime :time="item.date" format="MM-dd HH:mm:ss" />
          </div>
        </div>
      </div>
    </template>
  </NVirtualList>
</template>

<style scoped>
.chat-virtual-list .conversation {
  padding: 20px 30px;
  gap: 14px;
}
.chat-virtual-list .conversation .messages {
  width: fit-content;
  max-width: 60%;
}
.chat-virtual-list .conversation .messages .message {
  background-color: var(--base-color);
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: var(--border-radius);
  width: fit-content;
  font-size: 14px;
}
.chat-virtual-list .conversation .messages .date {
  opacity: 0.8;
  font-size: 12px;
  padding: 0 3px;
}
.chat-virtual-list .conversation.mine {
  flex-direction: row-reverse;
}
.chat-virtual-list .conversation.mine .messages {
  align-items: end;
}
.chat-virtual-list .conversation.mine .messages .message {
  background-color: var(--primary-color);
  color: var(--base-color);
}
@container (max-width: 500px) {
  .chat-virtual-list .conversation .messages {
    max-width: 90%;
  }
}
</style>
