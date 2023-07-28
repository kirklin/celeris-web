<script setup lang="ts">
import { PermissionModeConstants } from "@celeris/constants";
import { useAppPermission } from "~/composables";

const { togglePermissionMode, getPermissionMode } = useAppPermission();
const { t } = useI18n();
</script>

<template>
  <NCard :title="t('page.permission.permissionMode.currentMode')" embedded :bordered="false">
    <NButton type="info">
      {{ getPermissionMode === PermissionModeConstants.BACKEND ? t('page.permission.permissionMode.backendMode') : t('page.permission.permissionMode.frontendMode') }}
    </NButton>
    <NButton class="ml-4" type="primary" @click="togglePermissionMode">
      {{ t("page.permission.permissionMode.toggleMode") }}
    </NButton>
  </NCard>
</template>
