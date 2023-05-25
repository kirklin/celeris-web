<script setup lang="ts">
import { useHeaderSetting } from "~/composables";
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { toggleShouldShowSettingDrawer } = useHeaderSetting();
</script>

<template>
  <IconButtonWithToolTip
    tooltip-text="Open Setting Drawer" icon="i-tabler-settings" color="gray"
    @click="toggleShouldShowSettingDrawer"
  />
</template>

<style scoped>

</style>
