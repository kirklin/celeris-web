<script setup lang="ts">
import { logger } from "@celeris/utils";
import { useThemeSetting } from "~/composables";
import { designNamespace, designPrefixCls } from "~/setting/designSetting";

logger.info("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*");
const { getNaivePresetTheme } = useThemeSetting();
</script>

<template>
  <NConfigProvider :theme="getNaivePresetTheme" :cls-prefix="designPrefixCls" :namespace="designNamespace" class="w-full h-full">
    <CAAppNaiveUIProvider>
      <RouterView />
    </CAAppNaiveUIProvider>
  </NConfigProvider>
</template>
