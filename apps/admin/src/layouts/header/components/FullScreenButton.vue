<script setup lang="ts">
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { toggle: toggleFullScreen } = useFullscreen();
const { t } = useI18n();
</script>

<template>
  <IconButtonWithToolTip :tooltip-text="t('layouts.header.toggleFullScreen')" icon="i-tabler-maximize" color="gray" @click="toggleFullScreen" />
</template>

<style scoped>

</style>
