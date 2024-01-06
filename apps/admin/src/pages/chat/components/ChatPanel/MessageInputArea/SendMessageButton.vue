<script setup lang="ts">
import ActionIcon from "~/component/ActionIcon/src/ActionIcon.vue";
</script>

<template>
  <div class="flex items-center">
    <NSpace>
      <ActionIcon tooltip-text="清空" icon="i-tabler-x">
        清空
      </ActionIcon>
      <ActionIcon tooltip-text="发送" icon="i-tabler-send">
        发送
      </ActionIcon>
    </NSpace>
  </div>
</template>

<style scoped>

</style>
