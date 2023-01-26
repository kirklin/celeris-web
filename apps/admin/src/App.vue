<script setup lang="ts">
import { logLabeled } from "@celeris/utils/src/logger";
import { designNamespace } from "~/config/designConfig";
logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<template>
  <ElConfigProvider :namespace="designNamespace">
    <router-view />
  </ElConfigProvider>
</template>
