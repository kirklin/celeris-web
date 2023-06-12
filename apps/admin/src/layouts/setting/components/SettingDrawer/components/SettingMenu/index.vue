<script lang="ts" setup>
defineOptions({
  name: "SettingMenu",
});

defineProps<Props>();

interface Props {
  label: string;
}
</script>

<template>
  <div class="flex items-center justify-between">
    <span>{{ label }}</span>
    <slot />
  </div>
</template>

<style scoped></style>
