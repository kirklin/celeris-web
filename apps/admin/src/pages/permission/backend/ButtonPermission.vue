<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { usePermissionStore } from "~/store/modules/permission";
import { useUserStore } from "~/store/modules/user";
import Authority from "~/component/Authority/src/Authority.vue";

const { hasPermission, isBackendPermissionMode } = useAppPermission();
const permissionStore = usePermissionStore();
const userStore = useUserStore();
const { t } = useI18n();
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
async function switchToken(role: RoleConstants) {
  // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
  const token = `${role}FakeToken`;
  userStore.setToken(token);

  // 重新获取用户信息和菜单
  await userStore.getUserInfoAction();
  await permissionStore.changePermissionCode();
}
</script>

<template>
  <NCard :title="t('page.permission.pageTitles.button')">
    <CurrentPermissionMode />
    <NCard class="my-4" :title="t('page.permission.currentCode')" embedded :bordered="false">
      {{ permissionStore.getPermissionCodes }}
    </NCard>
    <NDivider />
    <NAlert
      class="mt-4"
      type="info"
      :title="t('page.permission.backendLeftMenuChangeTitle')"
      show-icon
    />

    <NDivider />

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
    <template v-if="isBackendPermissionMode">
      <NDivider>{{ t('page.permission.componentWayTitle') }}</NDivider>
      <Authority value="1000">
        <NButton type="primary" class="mx-4">
          {{ t('page.permission.codeButtonText', { code: "1000" }) }}
        </NButton>
      </Authority>

      <Authority value="2000">
        <NButton type="success" class="mx-4">
          {{ t('page.permission.codeButtonText', { code: "2000" }) }}
        </NButton>
      </Authority>

      <Authority :value="['1000', '2000']">
        <NButton type="error" class="mx-4">
          {{ t('page.permission.codeButtonText', { code: ['1000', '2000'] }) }}
        </NButton>
      </Authority>

      <NDivider>{{ t('page.permission.functionWayTitle') }}</NDivider>
      <NButton v-if="hasPermission('1000')" type="primary" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: "1000" }) }}
      </NButton>

      <NButton v-if="hasPermission('2000')" type="success" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: "2000" }) }}
      </NButton>

      <NButton v-if="hasPermission(['1000', '2000'])" type="error" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: ['1000', '2000'] }) }}
      </NButton>

      <NDivider>{{ t('page.permission.directiveWayTitle') }}</NDivider>
      <NButton v-auth="'1000'" type="primary" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: "1000" }) }}
      </NButton>

      <NButton v-auth="'2000'" type="success" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: "2000" }) }}
      </NButton>

      <NButton v-auth="['1000', '2000']" type="error" class="mx-4">
        {{ t('page.permission.codeButtonText', { code: ['1000', '2000'] }) }}
      </NButton>
    </template>
  </NCard>
</template>

<style scoped>

</style>
