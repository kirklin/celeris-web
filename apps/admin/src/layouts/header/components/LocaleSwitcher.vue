<script setup lang="ts">
import { LocalesEngine, languagesNameList, useI18n } from "@celeris/locale";
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

import { useAppSetting } from "~/composables";

const { getLocale, setProjectSetting } = useAppSetting();
const { locale, availableLocales, t } = useI18n();

const options = computed(
  () => availableLocales.map(item => ({
    label: languagesNameList.find(languagesName => languagesName.code === item)?.nativeName,
    key: item,
  })),
);
const handleSelect = (key: string) => {
  setProjectSetting({ locale: key });
  locale.value = key;
  LocalesEngine.setLocale(key);
};
</script>

<template>
  <NDropdown :options="options" trigger="click" :value="getLocale" @select="handleSelect">
    <IconButtonWithToolTip :tooltip-text="t('layouts.header.switchLocale')" icon="i-tabler-language" color="gray" />
  </NDropdown>
</template>

<style scoped>

</style>
