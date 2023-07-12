<script setup lang="ts">
import { logger } from "@celeris/utils";
import { useNaiveUIConfigProvider } from "~/composables";

logger.info("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*");
const { configProviderProps } = useNaiveUIConfigProvider();
</script>

<template>
  <NConfigProvider v-bind="configProviderProps" class="w-full h-full">
    <CAAppNaiveUIProvider>
      <RouterView />
    </CAAppNaiveUIProvider>
  </NConfigProvider>
</template>
