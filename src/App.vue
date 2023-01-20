<script setup lang="ts">
import { logLabeled } from "./utils/logger";
logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<template>
  <ElConfigProvider namespace="ca">
    <router-view />
  </ElConfigProvider>
</template>
