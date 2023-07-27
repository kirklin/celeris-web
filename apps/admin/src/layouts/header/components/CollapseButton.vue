<script setup lang="ts">
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import IconButtonWithToolTip from "~/layouts/header/components/IconButtonWithToolTip.vue";

const { t } = useI18n();
</script>

<template>
  <IconButtonWithToolTip :tooltip-text="t('layouts.header.toggleCollapsed')" icon="i-tabler-menu-2" color="gray" @click="useMenuSetting().toggleCollapsed()" />
</template>
