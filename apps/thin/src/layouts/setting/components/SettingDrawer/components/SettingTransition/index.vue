<script setup lang="ts">
import { RouterTransitionConstants } from "@celeris/constants";
import { SettingMenu } from "~/layouts/setting/components/SettingDrawer/components";
import { useTransitionSetting } from "~/composables";

const { t } = useI18n();
const {
  getShouldEnableTransition,
  setShouldEnableTransition,
  getShouldOpenNProgress,
  setShouldOpenNProgress,
  getShouldOpenPageLoading,
  setShouldOpenPageLoading,
  getRouterBasicTransition,
  setRouterBasicTransition,
} = useTransitionSetting();

function convertTransitionConstantsToOptions<T extends Record<string, string>>(transitionConstants: T): { label: string; value: T[keyof T] }[] {
  const options: { label: string; value: T[keyof T] }[] = [];
  for (const key in transitionConstants) {
    if (Number.isNaN(Number(key))) {
      options.push({
        label: key,
        value: transitionConstants[key as keyof T],
      });
    }
  }
  return options;
}
</script>

<template>
  <NDivider title-placement="center">
    {{ t('layouts.header.transitionSetting.title') }}
  </NDivider>
  <NSpace vertical size="large">
    <SettingMenu :label="t('layouts.header.transitionSetting.enableTransition')">
      <NSwitch :value="getShouldEnableTransition" @update:value="setShouldEnableTransition" />
    </SettingMenu>
    <SettingMenu :label="t('layouts.header.transitionSetting.enableProgressBar')">
      <NSwitch :disabled="!getShouldEnableTransition" :value="getShouldOpenNProgress" @update:value="setShouldOpenNProgress" />
    </SettingMenu>
    <SettingMenu :label="t('layouts.header.transitionSetting.enablePageLoadingTransition')">
      <NSwitch :disabled="!getShouldEnableTransition" :value="getShouldOpenPageLoading" @update:value="setShouldOpenPageLoading" />
    </SettingMenu>
    <SettingMenu :label="t('layouts.header.transitionSetting.routeTransition')">
      <NSelect
        class="w-1/2"
        size="small"
        :disabled="!getShouldEnableTransition"
        :value="getRouterBasicTransition"
        :options="convertTransitionConstantsToOptions(RouterTransitionConstants)"
        @update:value="setRouterBasicTransition"
      />
    </SettingMenu>
  </NSpace>
</template>

<style scoped>

</style>
