<script setup lang="ts">
import type { Assistant } from "~/pages/chat/components/AssistantSidebar/types";

defineProps({
  assistant: {
    type: Object as () => Assistant, // Replace 'Contact' with your specific role object type
    required: true,
  },
});
</script>

<template>
  <div class="w-full rounded-2xl flex mx-2 px-2 py-1">
    <div class="relative rounded-full flex items-center pr-2" :class="{ available: assistant.available }">
      <NAvatar round :src="assistant.avatar" size="large" />
    </div>
    <div class="overflow-hidden flex flex-col grow gap-1 p-1 ">
      <div class="overflow-hidden flex justify-between items-center ">
        <NText class="name whitespace-nowrap text-ellipsis grow font-bold">
          {{ assistant.name }}
        </NText>
        <NText class="date text-ellipsis">
          {{ assistant.lastDateText }}
        </NText>
      </div>
      <NText class="description text-ellipsis">
        {{ assistant.description }}
      </NText>
    </div>
  </div>
</template>

<style lang="css" scoped>
</style>
