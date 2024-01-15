<script setup lang="ts">
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { copyToClipboard, generateColorPalettes } from "@celeris/utils";

defineOptions({
  name: "ColorPalette",
});

defineProps({
  primaryColor: {
    type: String,
    default: "#66CCFF",
  },
  colorName: {
    type: String,
    default: "primary",
  },
  colorType: {
    type: String,
    default: "hex",
  },
});

// Extend colord with a11yPlugin
extend([a11yPlugin]);

// Copy color value to clipboard
function copyColorValue(hex: string) {
  copyToClipboard(hex);
}

/**
 * Generates a contrasting text color based on the background color's luminance.
 * 根据背景色的亮度生成对比的文本颜色。
 *
 * @param {string} background - The background color in hexadecimal format.
 *                             十六进制格式的背景颜色。
 * @returns {string} Returns either "black" or "white" as the contrasting text color.
 *                   返回 "black" 或 "white" 作为对比的文本颜色。
 */
function getContrastingColor(background: string): string {
  const bgColor = colord(background);
  const luminance = bgColor.luminance();
  const threshold = 0.4;
  return luminance > threshold ? "black" : "white";
}

/**
 * Gets the background and text color styles for a given hex color.
 * 获取给定十六进制颜色的背景和文本颜色样式。
 *
 * @param {string} hex - The color in hexadecimal format.
 *                      十六进制格式的颜色。
 * @returns {object} Returns an object with backgroundColor and color properties.
 *                   返回包含 backgroundColor 和 color 属性的对象。
 */
function getColorStyle(hex: string): { backgroundColor: string; color: string } {
  const textColor = getContrastingColor(hex);
  return {
    backgroundColor: hex,
    color: textColor,
  };
}
// Show color palette value
const showColorPaletteValue = ref(false);
</script>

<template>
  <div class="color-palette">
    <div
      class="color-palette__header"
      :style="{ backgroundColor: primaryColor, color: getContrastingColor(primaryColor) }"
    >
      <div class="color-palette__header-title">
        {{ colorName }}
      </div>
      <div class="color-palette__header-value">
        <span class="color-palette__header-value-name">{{ colorName }}-6</span>
        <span class="color-palette__header-value-color" :style="getColorStyle(primaryColor)">{{ primaryColor }}</span>
      </div>
    </div>
    <div v-for="(color, index) in generateColorPalettes(primaryColor)" :key="index">
      <div
        :style="getColorStyle(color)"
        class="color-palette__item"
        @mouseover="showColorPaletteValue = true"
        @mouseleave="showColorPaletteValue = false"
        @click="copyColorValue(color)"
      >
        <span class="color-palette__item-label">
          {{ colorName }}-{{ index + 1 }}
        </span>
        <span
          class="color-palette__item-value"
          :style="{ opacity: showColorPaletteValue ? 1 : 0 }"
        >
          {{ colord(color).toHex().toString().toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-palette {
  @apply cursor-pointer text-sm;
}

.color-palette__header {
  @apply text-light h-24 p-4 font-semibold rounded hover:scale-105 transition-all;
}

.color-palette__header-title {
  @apply mb-4 px-1;
}
.color-palette__header-value {
  @apply flex justify-between px-1 font-normal;
}

.color-palette__item {
  @apply h-12 w-full flex justify-between px-5 rounded font-normal items-center hover:scale-105 transition-all;
}
.color-palette__item-label {
  @apply transition-all;
}
.color-palette__item-value {
  @apply transition-all;
}
</style>
