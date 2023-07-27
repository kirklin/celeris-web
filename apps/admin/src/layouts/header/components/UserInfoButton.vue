<script setup lang="ts">
import type { UserInfo } from "@celeris/types";
import ToolTipper from "~/layouts/header/components/ToolTipper.vue";
import { useUserStore } from "~/store/modules/user";

const { t } = useI18n();
const userStore = useUserStore();
const userInfo = toRef<UserInfo | null>(userStore.getUserInfo);
const dialog = useDialog();
const message = useMessage();
const handleLogout = () => {
  dialog.warning({
    title: t("layouts.logoutConfirmation.title"),
    content: t("layouts.logoutConfirmation.content"),
    positiveText: t("layouts.logoutConfirmation.positiveText"),
    negativeText: t("layouts.logoutConfirmation.negativeText"),
    onPositiveClick: () => {
      userStore.logout();
      message.success(t("layouts.logoutConfirmation.onPositiveClickMessage"));
    },
    onNegativeClick: () => {
      message.info(t("layouts.logoutConfirmation.onNegativeClickMessage"));
    },
  });
};
</script>

<template>
  <NPopover trigger="click" :show-arrow="false">
    <template #trigger>
      <ToolTipper :tooltip-text="t('layouts.userInfo.userInformation')">
        <div class="btn-icon rounded-3xl p-2 pr-2 justify-between h-12 w-24 bg-gray-50 hover:bg-gray-100">
          <div class="flex flex-row">
            <div class="flex-1 flex items-center justify-center">
              <NAvatar round :src="userInfo?.avatarUrl" />
            </div>
            <div class="flex-1 flex items-center justify-center">
              <svg class="text-center text-gray-700 text-xl i-tabler-settings" />
            </div>
          </div>
        </div>
      </ToolTipper>
    </template>
    <h4 class="mb-1">
      <span class="font-bold">{{ t('layouts.userInfo.greeting') }}, </span> <span class="">{{ userInfo?.fullName }} </span>
    </h4>
    <p>
      {{ t('layouts.userInfo.rolesList', { roles: userInfo?.roles }) }}
    </p>
    <template #footer>
      <div>
        <NButton block quaternary @click="handleLogout">
          {{ t('layouts.userInfo.logoutButton') }}
        </NButton>
      </div>
    </template>
  </NPopover>
</template>

<style scoped>

</style>
