<script setup lang="ts">
import { logLabeled } from "@celeris/utils/src/logger";
import NaiveProvider from "~/components/NaiveProvider.vue";
import { designNamespace } from "~/config/designConfig";
logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<template>
  <n-config-provider :cls-prefix="designNamespace" class="w-full h-full">
    <NaiveProvider>
      <router-view />
    </NaiveProvider>
  </n-config-provider>
</template>
