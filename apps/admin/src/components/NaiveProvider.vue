<script setup lang="ts">
</script>

<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
