<script setup lang="ts">
import type { Role } from "~/pages/chat/components/RoleManagementSidebar/types";
import RoleItem from "~/pages/chat/components/RoleManagementSidebar/components/RoleItem.vue";

const fakeRoles: Role[] = [
  {
    id: "1",
    name: "产品经理",
    avatar: "https://avatars.githubusercontent.com/u/17453452",
    prompt: "产品经理正在思考下一个产品的功能",
    available: true,
    lastDate: new Date("2023-12-31T08:00:00Z"),
    lastDateText: "昨天",
    description: "负责产品规划和功能开发的专业人员",
  },
  {
    id: "2",
    name: "设计师",
    avatar: "https://avatars.githubusercontent.com/u/17453452",
    prompt: "设计师正在创建新的界面原型",
    available: true,
    lastDate: new Date("2023-12-30T10:30:00Z"),
    lastDateText: "2天前",
    description: "负责产品界面和用户体验设计的专业人员",
  },
  // 可以继续添加其他角色的假数据
];
</script>

<template>
  <div class="contacts-list">
    <NEl
      v-for="role of fakeRoles"
      :key="role.id"
      class="cursor-pointer flex items-center px-4 py-2 w-full overflow-hidden transition ease-out border-b-1 border-solid border-[var(--border-color)] hover:bg-[var(--hover-color)]"
    >
      <RoleItem :role="role" />
    </NEl>
  </div>
</template>

<style scoped>

</style>
