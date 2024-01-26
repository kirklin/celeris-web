<script setup lang="ts">
import ActionIcon from "~/component/ActionIcon/src/ActionIcon.vue";

const SEARCH_ICON = "tabler:search";
</script>

<template>
  <div class="actionbar flex items-center p-2 px-3 rounded-2xl">
    <NInput placeholder="搜索助手" clearable size="medium" class="bg-[--action-color]">
      <template #prefix>
        <CAIcon :name="SEARCH_ICON" />
      </template>
    </NInput>
    <ActionIcon class="ml-2" icon="tabler:message-plus" tooltip-text="新建助手" />
  </div>
</template>

<style scoped>

</style>
