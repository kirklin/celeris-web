<script setup lang="ts">
import type { UserInfo } from "@celeris/types";
import { ToolTipper } from "~/component/ActionIcon";
import { useUserStore } from "~/store/modules/user";

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const userInfo = toRef<UserInfo | null>(userStore.getUserInfo);
const dialog = useDialog();
const message = useMessage();
function handleLogout() {
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
}
</script>

<template>
  <NPopover trigger="click" :show-arrow="false">
    <template #trigger>
      <ToolTipper :tooltip-text="t('layouts.userInfo.userInformation')">
        <NEl tag="div" class="btn-icon rounded-3xl p-2 pr-2 justify-between h-12 w-24 bg-[var(--action-color)] hover:bg-[var(--hover-color)]">
          <div class="flex flex-row">
            <div class="flex-1 flex items-center justify-center">
              <NAvatar round :src="userInfo?.avatarUrl" />
            </div>
            <div class="flex-1 flex items-center justify-center">
              <svg class="text-center text-[var(--text-color-base)] text-xl i-tabler:user" />
            </div>
          </div>
        </NEl>
      </ToolTipper>
    </template>
    <template #header>
      <h4 class="mb-1">
        <span class="font-bold">{{ t('layouts.userInfo.greeting') }}, </span> <span class="">{{ userInfo?.fullName }} </span>
      </h4>
      <p>
        {{ t('layouts.userInfo.rolesList', { roles: userInfo?.roles }) }}
      </p>
    </template>
    <NButton block quaternary @click="router.push('/profile')">
      {{ t('routes.profile.profile') }}
    </NButton>
    <template #footer>
      <NButton block quaternary @click="handleLogout">
        {{ t('layouts.userInfo.logoutButton') }}
      </NButton>
    </template>
  </NPopover>
</template>

<style scoped>

</style>
