<script lang="ts" setup>
import { isWhiteColor } from "@celeris/utils";

defineOptions({
  name: "ColorCheckbox",
});

const props = withDefaults(defineProps<Props>(), {
  iconClass: "i-line-md-confirm",
});

interface Props {
  /**
   * 颜色
   * Color
   */
  color: string;
  /**
   * 是否选中
   * Whether it is checked
   */
  checked: boolean;
  /**
   * 图标类名
   * Icon class name
   */
  iconClass?: string;
}

const isWhite = computed(() => isWhiteColor(props.color));
</script>

<template>
  <div class="flex justify-center items-center p-0 w-5 h-5 rounded shadow cursor-pointer hover:border" :style="{ backgroundColor: color }">
    <svg v-if="checked" :class="[iconClass, isWhite ? 'text-gray-700' : 'text-white']" />
  </div>
</template>

<style scoped></style>
