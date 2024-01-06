<script setup lang="ts">
import { useMenuSetting } from "~/composables/setting/useMenuSetting";
import { ActionIcon } from "~/component/ActionIcon";

const { t } = useI18n();
</script>

<template>
  <ActionIcon :tooltip-text="t('layouts.header.toggleCollapsed')" icon="i-tabler-menu-2" @click="useMenuSetting().toggleCollapsed()" />
</template>
