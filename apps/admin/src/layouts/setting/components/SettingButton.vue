<script setup lang="ts">
import { useHeaderSetting } from "~/composables";
import { ActionIcon } from "~/component/ActionIcon";

const { toggleShouldShowSettingDrawer } = useHeaderSetting();
const { t } = useI18n();
</script>

<template>
  <ActionIcon
    :tooltip-text="t('layouts.header.openSettingDrawer')" icon="i-tabler-settings"
    @click="toggleShouldShowSettingDrawer"
  />
</template>

<style scoped>

</style>
