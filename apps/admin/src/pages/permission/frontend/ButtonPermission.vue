<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";

import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import Authority from "~/component/Authority/src/Authority.vue";
import { useUserStore } from "~/store/modules/user";

const { changeRole, hasPermission } = useAppPermission();
const userStore = useUserStore();
const isAdmin = computed(() => userStore.getRoleList.includes(RoleConstants.ADMIN));
const isUser = computed(() => userStore.getRoleList.includes(RoleConstants.USER));
</script>

<template>
  <div class="p-4">
    <CurrentPermissionMode />

    <p>
      当前角色: <a> {{ userStore.getRoleList }} </a>
    </p>
    <NAlert class="mt-4" type="info" title="点击后请查看按钮变化" show-icon />

    <div class="mt-4">
      权限切换(请先切换权限模式为前端角色权限模式):
      <NSpace>
        <NButton :type="isAdmin ? 'primary' : 'default'" @click="changeRole(RoleConstants.ADMIN)">
          {{ RoleConstants.ADMIN }}
        </NButton>
        <NButton :type="isUser ? 'primary' : 'default'" @click="changeRole(RoleConstants.USER)">
          {{ RoleConstants.USER }}
        </NButton>
      </NSpace>
    </div>
    <NDivider>组件方式判断权限(有需要可以自行全局注册)</NDivider>
    <Authority :value="RoleConstants.ADMIN">
      <NButton type="primary" class="mx-4">
        拥有ADMIN角色权限可见
      </NButton>
    </Authority>

    <Authority :value="RoleConstants.USER">
      <NButton strong secondary type="info" class="mx-4">
        拥有USER角色权限可见
      </NButton>
    </Authority>

    <Authority :value="[RoleConstants.USER, RoleConstants.ADMIN]">
      <NButton strong secondary type="success" class="mx-4">
        拥有[USER,ADMIN]角色权限可见
      </NButton>
    </Authority>

    <NDivider>函数方式方式判断权限(适用于函数内部过滤)</NDivider>
    <NButton v-if="hasPermission(RoleConstants.ADMIN)" type="primary" class="mx-4">
      拥有ADMIN角色权限可见
    </NButton>

    <NButton v-if="hasPermission(RoleConstants.USER)" strong secondary type="info" class="mx-4">
      拥有USER角色权限可见
    </NButton>

    <NButton v-if="hasPermission([RoleConstants.USER, RoleConstants.ADMIN])" strong secondary type="success" class="mx-4">
      拥有[USER,ADMIN]角色权限可见
    </NButton>

    <NDivider>指令方式方式判断权限(该方式不能动态修改权限.)</NDivider>
    <NButton v-auth="RoleConstants.ADMIN" type="primary" class="mx-4">
      拥有ADMIN角色权限可见
    </NButton>

    <NButton v-auth="RoleConstants.USER" strong secondary type="info" class="mx-4">
      拥有USER角色权限可见
    </NButton>

    <NButton v-auth="[RoleConstants.USER, RoleConstants.ADMIN]" strong secondary type="success" class="mx-4">
      拥有[USER,ADMIN]角色权限可见
    </NButton>
  </div>
</template>

<style scoped>

</style>
