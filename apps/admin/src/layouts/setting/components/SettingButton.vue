<script setup lang="ts">
import { ActionIcon } from "~/component/ActionIcon";
import { useHeaderSetting } from "~/composables";

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
