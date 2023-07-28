<script setup lang="ts">
import { RoleConstants } from "@celeris/constants";

const { t } = useI18n();
</script>

<template>
  <NCard :title="t('page.permission.roleButtonText', { role: RoleConstants.ADMIN })" />
</template>

<style scoped>

</style>
