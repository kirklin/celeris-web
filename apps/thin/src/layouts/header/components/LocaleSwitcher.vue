<script setup lang="ts">
import { LocalesEngine, languagesNameList, useI18n } from "@celeris/locale";
import { ActionIcon } from "~/component/ActionIcon";

import { useAppSetting } from "~/composables";

const { getLocale, setProjectSetting } = useAppSetting();
const { locale, availableLocales, t } = useI18n();

const options = computed(
  () => availableLocales.map(item => ({
    label: languagesNameList.find(languagesName => languagesName.code === item)?.nativeName,
    key: item,
  })),
);
function handleSelect(key: string) {
  setProjectSetting({ locale: key });
  locale.value = key;
  LocalesEngine.setLocale(key);
}
</script>

<template>
  <NDropdown :options="options" trigger="click" :value="getLocale" @select="handleSelect">
    <ActionIcon :tooltip-text="t('layouts.header.switchLocale')" icon="i-tabler-language" />
  </NDropdown>
</template>

<style scoped>

</style>
