<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { useUserStore } from "~/store/modules/user";

const userStore = useUserStore();
const { isBackendPermissionMode, refreshMenu } = useAppPermission();
const { t } = useI18n();
async function switchToken(role: RoleConstants) {
  // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
  const token = `${role}FakeToken`;
  userStore.setToken(token);

  // 重新获取用户信息和菜单
  await userStore.getUserInfoAction();
  await refreshMenu();
}
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
</script>

<template>
  <NCard :title="t('page.permission.pageTitles.backend')">
    <CurrentPermissionMode />

    <NAlert class="my-4" type="info" :title="t('page.permission.clickToSeeLeftMenuChange')" show-icon />

    <NCard class="mt-4" :title="t('page.permission.backendPermissionSwitchTitle')" embedded :bordered="false">
      <NSpace>
        <NButton :type="isAdmin ? 'primary' : 'default'" :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.ADMIN)">
          {{ RoleConstants.ADMIN }}
        </NButton>
        <NButton :type="isUser ? 'primary' : 'default'" :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.USER)">
          {{ RoleConstants.USER }}
        </NButton>
      </NSpace>
    </NCard>
  </NCard>
</template>

<style scoped>

</style>
