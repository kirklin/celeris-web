<script lang="ts" setup>
import { computed } from "vue";
import type { PopoverPlacement } from "naive-ui";

interface ToolTipperProps {
  // Tooltip 显示的文本信息
  // The text content of the tooltip
  tooltipText?: string;

  // Tooltip 显示的位置
  // The placement of the tooltip
  placement?: PopoverPlacement;

  // Tooltip 的额外样式类，用于自定义样式
  // The class name to apply to the content element for custom styling
  contentClass?: string;
}

const props = withDefaults(defineProps<ToolTipperProps>(), {
  tooltipText: "",
  placement: "bottom",
  contentClass: "",
});
const { tooltipText, placement, contentClass } = toRefs(props);
const shouldShowTooltip = computed(() => Boolean(tooltipText));
</script>

<template>
  <div v-if="shouldShowTooltip">
    <NTooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div class="flex-center h-full rounded-lg cursor-pointer" :class="contentClass">
          <slot />
        </div>
      </template>
      {{ tooltipText }}
    </NTooltip>
  </div>
  <div v-else class="flex-center rounded-lg cursor-pointer" :class="contentClass">
    <slot />
  </div>
</template>

<style scoped></style>
