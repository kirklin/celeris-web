<script setup lang="ts">
import type { Role } from "~/pages/chat/components/RoleManagementSidebar/types";

defineProps({
  role: {
    type: Object as () => Role, // Replace 'Contact' with your specific role object type
    required: true,
  },
});
</script>

<template>
  <div class="relative rounded-full flex items-center pr-2" :class="{ available: role.available }">
    <NAvatar round :src="role.avatar" />
  </div>
  <div class="overflow-hidden flex flex-col grow">
    <div class="overflow-hidden flex justify-between items-center">
      <div class="name whitespace-nowrap text-ellipsis grow">
        {{ role.name }}
      </div>
      <div class="date text-ellipsis">
        {{ role.lastDateText }}
      </div>
    </div>
    <div class="description text-ellipsis">
      {{ role.description }}
    </div>
  </div>
</template>

<style lang="css" scoped>
</style>
