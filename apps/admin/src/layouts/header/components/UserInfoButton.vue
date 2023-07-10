<script setup lang="ts">
import type { UserInfo } from "@celeris/types";
import ToolTipper from "~/layouts/header/components/ToolTipper.vue";
import { useUserStore } from "~/store/modules/user";

const userStore = useUserStore();
const userInfo = toRef<UserInfo | null>(userStore.getUserInfo);
const dialog = useDialog();
const message = useMessage();
const handleLogout = () => {
  dialog.warning({
    title: "警告",
    content: "您确定要退出登录吗？",
    positiveText: "退出登录",
    negativeText: "取消",
    onPositiveClick: () => {
      userStore.logout();
      message.success("退出登录成功");
    },
    onNegativeClick: () => {
      message.info("取消退出登录");
    },
  });
};
</script>

<template>
  <NPopover trigger="click" :show-arrow="false">
    <template #trigger>
      <ToolTipper tooltip-text="User Info">
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
      <span class="font-bold">Hello, </span> <span class="">{{ userInfo?.fullName }}</span>
    </h4>
    <p>
      角色列表: {{ userInfo?.roles }}
    </p>
    <template #footer>
      <div>
        <NButton block quaternary @click="handleLogout">
          退出登录
        </NButton>
      </div>
    </template>
  </NPopover>
</template>

<style scoped>

</style>
