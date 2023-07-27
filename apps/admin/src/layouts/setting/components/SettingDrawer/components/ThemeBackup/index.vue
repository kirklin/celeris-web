<script setup lang="ts">
import { useDesignStore } from "~/store/modules/design";

defineOptions({
  name: "ThemeBackup",
});
const { t } = useI18n();
const message = useMessage();
const designStore = useDesignStore();

const dataClipboardText = ref(getSettingJson());

function getSettingJson() {
  return JSON.stringify(designStore.$state);
}

function handleResetSetting() {
  designStore.resetDesignState();
  message.success(t("layouts.header.themeConfig.message.resetConfigSuccess"));
}
function handleCopySetting() {
  message.success(t("layouts.header.themeConfig.message.copyConfigSuccess"));
}
</script>

<template>
  <NDivider title-placement="center">
    {{ t('layouts.header.themeConfig.title') }}
  </NDivider>
  <NSpace vertical>
    <div v-copy="dataClipboardText">
      <NButton type="primary" :block="true" @click="handleCopySetting">
        {{ t('layouts.header.themeConfig.copyConfigButton') }}
      </NButton>
    </div>
    <NButton type="warning" :block="true" @click="handleResetSetting">
      {{ t('layouts.header.themeConfig.resetConfigButton') }}
    </NButton>
  </NSpace>
</template>

<style scoped></style>
