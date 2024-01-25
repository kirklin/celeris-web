<script setup lang="ts">
interface Item {
  uuid: string;
  title: string;
  isEdit: boolean;
}

const chatHistory = ref<Item[]>([]);

onMounted(() => {
  // Fetch or set initial dataSources
  chatHistory.value = [
    { uuid: "1", title: "Item 1", isEdit: false },
    { uuid: "2", title: "Item 2", isEdit: false },
    // Add more items as needed
  ];
});

function isActive(uuid: string): boolean {
  return uuid === chatHistory.value[0]?.uuid;
}

function handleSelect(_item: Item): void {
  // Handle selection of an item
  // For example, update the selected item in your data store
}

function handleEnter(item: Item, isEdit: boolean, event: KeyboardEvent): void {
  // Handle pressing Enter when editing an item
  if (event.key === "Enter") {
    item.isEdit = false; // Assuming you want to exit editing mode on Enter
    // You may want to save changes or perform other actions here
  }
}
</script>

<template>
  <NCollapse :default-expanded-names="['history']" arrow-placement="left" class=" chat-history-list">
    <NCollapseItem title="历史信息" name="history">
      <template #header-extra>
        <NBadge :value="chatHistory.length" :max="99" :offset="[0, 0]" color="transparent" />
      </template>
      <NScrollbar class="max-h-full p-2">
        <div class="flex flex-col gap-2 text-sm overflow-hidden">
          <template v-if="!chatHistory.length">
            <div class="flex flex-col items-center mt-4 text-center">
              <NEmpty />
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) of chatHistory" :key="index">
              <a
                class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
                :class="isActive(item.uuid) ? ['border-[#4b9e5f]', 'bg-neutral-100', 'text-[#4b9e5f]', 'dark:bg-[#24272e]', 'dark:border-[#4b9e5f]'] : ''"
                @click="handleSelect(item)"
              >
                <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
                  <NInput
                    v-if="item.isEdit"
                    v-model:value="item.title"
                    size="tiny"
                    @keypress="handleEnter(item, false, $event)"
                  />
                  <span v-else>{{ item.title }}</span>
                </div>
              </a>
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
