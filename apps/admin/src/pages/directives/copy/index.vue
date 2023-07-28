<script lang="ts" setup>
defineOptions({
  name: "Copy",
});
const { t } = useI18n();
const message = useMessage();
const source = ref("");
function handleCopy() {
  message.success(t("page.copyDirective.copySuccess"));
}
</script>

<template>
  <div class="h-full">
    <NCard :title="t('page.copyDirective.copyDirective')">
      <NInputGroup>
        <NInput v-model:value="source" :placeholder="t('page.copyDirective.copyPlaceholder')" />
        <NButton v-copy="source" type="primary" @click="handleCopy">
          {{ t("page.copyDirective.copy") }}
        </NButton>
      </NInputGroup>
    </NCard>
  </div>
</template>

<style scoped></style>
