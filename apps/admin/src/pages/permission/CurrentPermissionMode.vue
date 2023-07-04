<script setup lang="ts">
import { PermissionModeConstants } from "@celeris/constants";
import { useAppPermission } from "~/composables";

const { togglePermissionMode, getPermissionMode } = useAppPermission();
</script>

<template>
  <div class="mt-2">
    当前权限模式：
    <NButton type="info">
      {{ getPermissionMode === PermissionModeConstants.BACKEND ? '后台权限模式' : '前端角色权限模式' }}
    </NButton>
    <NButton class="ml-4" type="primary" @click="togglePermissionMode">
      切换权限模式
    </NButton>
  </div>
</template>
