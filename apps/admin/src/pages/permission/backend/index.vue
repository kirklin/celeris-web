<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { useUserStore } from "~/store/modules/user";

const userStore = useUserStore();
const { isBackendPermissionMode, refreshMenu } = useAppPermission();
async function switchToken(role: RoleConstants) {
  // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
  const token = `${role}FakeToken`;
  userStore.setToken(token);

  // 重新获取用户信息和菜单
  await userStore.getUserInfoAction();
  await refreshMenu();
}
</script>

<template>
  <NCard title="后端权限示例">
    <CurrentPermissionMode />

    <NAlert class="my-4" type="info" title="点击后请查看左侧菜单变化" show-icon />

    <NCard class="mt-4" title="权限切换(请先切换权限模式为后台权限模式)" embedded :bordered="false">
      <NSpace>
        <NButton :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.ADMIN)">
          获取ADMIN用户的菜单
        </NButton>
        <NButton :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.USER)">
          获取USER用户的菜单
        </NButton>
      </NSpace>
    </NCard>
  </NCard>
</template>

<style scoped>

</style>
