<script setup lang="ts">
import { ActionIcon } from "~/component/ActionIcon";
import { useMenuSetting } from "~/composables/setting/useMenuSetting";

const { t } = useI18n();

const { toggleCollapsed, getCollapsed } = useMenuSetting();
</script>

<template>
  <ActionIcon :tooltip-text="t('layouts.header.toggleCollapsed')" :icon="getCollapsed ? 'lucide:panel-right-close' : 'lucide:panel-left-close'" @click="toggleCollapsed()" />
</template>
