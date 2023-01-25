<script setup lang="ts">
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import UnoCSSIconButton from "~/layouts/header/components/UnoCSSIconButton.vue";
</script>

<template>
  <UnoCSSIconButton sr-only="Toggle Collapsed" icon="i-mdi-menu" @click="useMenuSetting().toggleCollapsed()" />
</template>
