<script setup lang="ts">
import { useDesignStore } from "~/store/modules/design";

defineOptions({
  name: "ThemeBackup",
});
const message = useMessage();
const designStore = useDesignStore();

const dataClipboardText = ref(getSettingJson());

function getSettingJson() {
  return JSON.stringify(designStore.$state);
}

function handleResetSetting() {
  designStore.resetDesignState();
  message.success("已重置配置，请重新拷贝！");
}
function handleCopySetting() {
  message.success("复制成功！");
}
</script>

<template>
  <NDivider title-placement="center">
    主题配置
  </NDivider>
  <NSpace vertical>
    <div v-copy="dataClipboardText">
      <NButton type="primary" :block="true" @click="handleCopySetting">
        拷贝当前配置
      </NButton>
    </div>
    <NButton type="warning" :block="true" @click="handleResetSetting">
      重置当前配置
    </NButton>
  </NSpace>
</template>

<style scoped></style>
