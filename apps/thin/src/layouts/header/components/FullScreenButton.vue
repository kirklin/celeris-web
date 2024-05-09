<script setup lang="ts">
import { ActionIcon } from "~/component/ActionIcon";

const { toggle: toggleFullScreen } = useFullscreen();
const { t } = useI18n();
</script>

<template>
  <ActionIcon :tooltip-text="t('layouts.header.toggleFullScreen')" icon="i-tabler-maximize" @click="toggleFullScreen" />
</template>

<style scoped>

</style>
