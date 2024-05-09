<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { useUserStore } from "~/store/modules/user";

const { changeRole } = useAppPermission();
const { t } = useI18n();
const userStore = useUserStore();
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
</script>

<template>
  <NCard :title="t('page.permission.pageTitles.frontend')">
    <CurrentPermissionMode />

    <NCard class="my-4" :title="t('page.permission.currentRole')" embedded :bordered="false">
      {{ userStore.getRoleList }}
    </NCard>

    <NAlert class="my-4" type="info" :title="t('page.permission.clickToSeeLeftMenuChange')" show-icon />

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
  </NCard>
</template>

<style scoped>
</style>
