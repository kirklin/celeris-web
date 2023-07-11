<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { useUserStore } from "~/store/modules/user";

const { changeRole } = useAppPermission();
const userStore = useUserStore();
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
</script>

<template>
  <NCard title="前端权限示例">
    <CurrentPermissionMode />

    <NCard class="my-4" title="当前角色" embedded :bordered="false">
      {{ userStore.getRoleList }}
    </NCard>

    <NAlert class="my-4" type="info" title="点击后请查看左侧菜单变化" show-icon />

    <NCard class="mt-4" title="权限切换(请先切换权限模式为前端角色权限模式)" embedded :bordered="false">
      <NSpace>
        <NButton :type="isAdmin ? 'primary' : 'default'" @click="changeRole(RoleConstants.ADMIN)">
          {{ RoleConstants.ADMIN }}
        </NButton>
        <NButton :type="isUser ? 'primary' : 'default'" @click="changeRole(RoleConstants.USER)">
          {{ RoleConstants.USER }}
        </NButton>
      </NSpace>
    </NCard>
  </NCard>
</template>

<style scoped>
</style>
