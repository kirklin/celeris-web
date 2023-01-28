<script setup lang="ts">
import { logLabeled } from "@celeris/utils/src/logger";
import { designNamespace, designPrefixCls } from "~/config/designConfig";
logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<template>
  <NConfigProvider :cls-prefix="designPrefixCls" :namespace="designNamespace" class="w-full h-full">
    <CAAppNaiveUIProvider>
      <RouterView />
    </CAAppNaiveUIProvider>
  </NConfigProvider>
</template>
