<script setup lang="ts">
import { useHeaderSetting } from "~/composables";
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { toggleShouldShowSettingDrawer } = useHeaderSetting();
const { t } = useI18n();
</script>

<template>
  <IconButtonWithToolTip
    :tooltip-text="t('layouts.header.openSettingDrawer')" icon="i-tabler-settings" color="gray"
    @click="toggleShouldShowSettingDrawer"
  />
</template>

<style scoped>

</style>
