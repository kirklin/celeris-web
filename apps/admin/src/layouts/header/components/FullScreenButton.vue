<script setup lang="ts">
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { toggle: toggleFullScreen } = useFullscreen();
</script>

<template>
  <IconButtonWithToolTip tooltip-text="Toggle FullScreen" icon="i-mdi-fullscreen" color="gray" size="5" @click="toggleFullScreen" />
</template>

<style scoped>

</style>
