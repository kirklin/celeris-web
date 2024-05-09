<script setup lang="ts">
import type { PropType } from "vue";
import type { RoleConstants } from "@celeris/constants";
import { useAppPermission } from "~/composables";

defineProps({
  /**
   * The specified role or permission code that determines visibility.
   * When the permission mode is set to "role", you can pass a role value as the prop value.
   * When the permission mode is set to "code", you can pass a permission code value as the prop value.
   * @default ''
   */
  value: {
    type: [Number, Array, String] as PropType<RoleConstants | RoleConstants[] | string | string[]>,
    default: "",
  },
});

const { hasPermission } = useAppPermission();
</script>

<template>
  <!-- Only show the slot content if the current user has permission -->
  <slot v-if="hasPermission(value)" />
</template>
