<script lang="ts" setup>
import { computed } from "vue";
import { PageConstants } from "@celeris/constants";
import { useRouter } from "vue-router";
import { logoImage } from "@celeris/assets";

defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },
  /**
   * titleSize With unocss
   */
  titleSize: { type: String, default: "xl" },
});
const AppName = computed(() => String(import.meta.env.VITE_GLOB_APP_TITLE));
const go = useRouter();
function goHome() {
  go.push(PageConstants.BASE_HOME);
}
</script>

<template>
  <div :class="`text-${titleSize}`" class="flex items-center justify-center font-semibold dark:text-white" @click="goHome">
    <img width="44" height="44" :src="logoImage" class="m-3 h-11" alt="Logo">
    <span v-show="showTitle">{{ AppName }}</span>
  </div>
</template>
