<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";
import CurrentPermissionMode from "../CurrentPermissionMode.vue";
import { usePermissionStore } from "~/store/modules/permission";
import { useUserStore } from "~/store/modules/user";
import Authority from "~/component/Authority/src/Authority.vue";

const { hasPermission, isBackendPermissionMode } = useAppPermission();
const permissionStore = usePermissionStore();
const userStore = useUserStore();

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
  <div class="p-4">
    <CurrentPermissionMode />
    <p>
      当前拥有的code列表: <a> {{ permissionStore.getPermissionCodes }} </a>
    </p>
    <NDivider />
    <NAlert
      class="mt-4"
      type="info"
      title="点击后请查看按钮变化(必须处于后台权限模式才可测试此页面所展示的功能)"
      show-icon
    />

    <NDivider />
    <NSpace>
      <NButton type="primary" :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.USER)">
        点击切换按钮权限(用户Role为USER)
      </NButton>
      <NButton type="primary" :disabled="!isBackendPermissionMode" @click="switchToken(RoleConstants.ADMIN)">
        点击切换按钮权限(用户Role为Admin,默认)
      </NButton>
    </NSpace>

    <template v-if="isBackendPermissionMode">
      <NDivider>组件方式判断权限</NDivider>
      <Authority value="1000">
        <NButton type="primary" class="mx-4">
          拥有code ['1000']权限可见
        </NButton>
      </Authority>

      <Authority value="2000">
        <NButton type="success" class="mx-4">
          拥有code ['2000']权限可见
        </NButton>
      </Authority>

      <Authority :value="['1000', '2000']">
        <NButton type="error" class="mx-4">
          拥有code ['1000','2000']角色权限可见
        </NButton>
      </Authority>

      <NDivider>函数方式方式判断权限</NDivider>
      <NButton v-if="hasPermission('1000')" type="primary" class="mx-4">
        拥有code ['1000']权限可见
      </NButton>

      <NButton v-if="hasPermission('2000')" type="success" class="mx-4">
        拥有code ['2000']权限可见
      </NButton>

      <NButton v-if="hasPermission(['1000', '2000'])" type="error" class="mx-4">
        拥有code ['1000','2000']角色权限可见
      </NButton>

      <NDivider>指令方式方式判断权限(该方式不能动态修改权限.)</NDivider>
      <NButton v-auth="'1000'" type="primary" class="mx-4">
        拥有code ['1000']权限可见
      </NButton>

      <NButton v-auth="'2000'" type="success" class="mx-4">
        拥有code ['2000']权限可见
      </NButton>

      <NButton v-auth="['1000', '2000']" type="error" class="mx-4">
        拥有code ['1000','2000']角色权限可见
      </NButton>
    </template>
  </div>
</template>

<style scoped>

</style>
