<script setup lang="ts">
import { useHeaderSetting } from "~/composables";
import { DarkMode, SettingTransition, ThemeBackup, ThemeColor } from "~/layouts/setting/components/SettingDrawer/components";

defineOptions({
  name: "SettingDrawer",
});
const { getShouldShowSettingDrawer, setShouldShowSettingDrawer } = useHeaderSetting();
const { t } = useI18n();
</script>

<template>
  <NDrawer
    :show="getShouldShowSettingDrawer" display-directive="show" width="25%"
    @mask-click="setShouldShowSettingDrawer(false)"
  >
    <NDrawerContent :title="t('layouts.header.projectSetting')" :native-scrollbar="false">
      <DarkMode />
      <ThemeColor />
      <ThemeBackup />
      <SettingTransition />
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>

</style>
