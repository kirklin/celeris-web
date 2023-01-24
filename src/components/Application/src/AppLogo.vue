<script lang="ts" setup>
import { computed } from "vue";
import { PageConstant } from "~/constant/pageConstant";
const props = defineProps({
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
  go.push(PageConstant.BASE_HOME);
}
</script>

<template>
  <div :class="`text-${titleSize}`" class="flex items-center justify-center font-semibold dark:text-white" @click="goHome">
    <img src="src/assets/logo.png" class="m-4 h-11" alt="Logo">
    <span v-show="showTitle">{{ AppName }}</span>
  </div>
</template>
