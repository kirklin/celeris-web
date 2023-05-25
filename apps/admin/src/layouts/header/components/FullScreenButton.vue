<script setup lang="ts">
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { toggle: toggleFullScreen } = useFullscreen();
</script>

<template>
  <IconButtonWithToolTip tooltip-text="Toggle FullScreen" icon="i-tabler-maximize" color="gray" @click="toggleFullScreen" />
</template>

<style scoped>

</style>
