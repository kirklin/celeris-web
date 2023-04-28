<script setup lang="ts">
import { logger } from "@celeris/utils";
import { designNamespace, designPrefixCls } from "~/config/designConfig";

logger.info("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*");
</script>

<template>
  <NConfigProvider :cls-prefix="designPrefixCls" :namespace="designNamespace" class="w-full h-full">
    <CAAppNaiveUIProvider>
      <RouterView />
    </CAAppNaiveUIProvider>
  </NConfigProvider>
</template>
