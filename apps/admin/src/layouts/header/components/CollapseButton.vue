<script setup lang="ts">
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";
</script>

<template>
  <IconButtonWithToolTip tooltip-text="Toggle Collapsed" icon="i-tabler-menu-2" color="gray" @click="useMenuSetting().toggleCollapsed()" />
</template>
