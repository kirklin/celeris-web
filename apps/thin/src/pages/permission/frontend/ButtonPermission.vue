<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";

import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import Authority from "~/component/Authority/src/Authority.vue";
import { useUserStore } from "~/store/modules/user";

const { changeRole, hasPermission } = useAppPermission();
const { t } = useI18n();
const userStore = useUserStore();
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
</script>

<template>
  <NCard :title="t('page.permission.pageTitles.button')">
    <CurrentPermissionMode />

    <NCard class="my-4" :title="t('page.permission.currentRole')" embedded :bordered="false">
      {{ userStore.getRoleList }}
    </NCard>

    <NAlert class="my-4" type="info" :title="t('page.permission.clickToSeeButtonChange')" show-icon />

    <NCard class="mt-4" :title="t('page.permission.frontendPermissionSwitchTitle')" embedded :bordered="false">
      <NSpace>
        <NButton :type="isAdmin ? 'primary' : 'default'" @click="changeRole(RoleConstants.ADMIN)">
          {{ RoleConstants.ADMIN }}
        </NButton>
        <NButton :type="isUser ? 'primary' : 'default'" @click="changeRole(RoleConstants.USER)">
          {{ RoleConstants.USER }}
        </NButton>
      </NSpace>
    </NCard>
    <NDivider>{{ t('page.permission.componentWayTitle') }}</NDivider>
    <Authority :value="RoleConstants.ADMIN">
      <NButton type="primary" class="mx-4">
        {{ t('page.permission.roleButtonText', { role: RoleConstants.ADMIN }) }}
      </NButton>
    </Authority>

    <Authority :value="RoleConstants.USER">
      <NButton strong secondary type="info" class="mx-4">
        {{ t('page.permission.roleButtonText', { role: RoleConstants.USER }) }}
      </NButton>
    </Authority>

    <Authority :value="[RoleConstants.USER, RoleConstants.ADMIN]">
      <NButton strong secondary type="success" class="mx-4">
        {{ t('page.permission.roleButtonText', { role: [RoleConstants.USER, RoleConstants.ADMIN] }) }}
      </NButton>
    </Authority>

    <NDivider>{{ t('page.permission.functionWayTitle') }}</NDivider>
    <NButton v-if="hasPermission(RoleConstants.ADMIN)" type="primary" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: RoleConstants.ADMIN }) }}
    </NButton>

    <NButton v-if="hasPermission(RoleConstants.USER)" strong secondary type="info" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: RoleConstants.USER }) }}
    </NButton>

    <NButton v-if="hasPermission([RoleConstants.USER, RoleConstants.ADMIN])" strong secondary type="success" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: [RoleConstants.USER, RoleConstants.ADMIN] }) }}
    </NButton>

    <NDivider>{{ t('page.permission.directiveWayTitle') }}</NDivider>
    <NButton v-auth="RoleConstants.ADMIN" type="primary" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: RoleConstants.ADMIN }) }}
    </NButton>

    <NButton v-auth="RoleConstants.USER" strong secondary type="info" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: RoleConstants.USER }) }}
    </NButton>

    <NButton v-auth="[RoleConstants.USER, RoleConstants.ADMIN]" strong secondary type="success" class="mx-4">
      {{ t('page.permission.roleButtonText', { role: [RoleConstants.USER, RoleConstants.ADMIN] }) }}
    </NButton>
  </NCard>
</template>

<style scoped>

</style>
