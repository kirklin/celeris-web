<script setup lang="ts">
import { nextTick, ref } from "vue";
import VCharts from "./vueEchartsChunk";

defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});
const renderChart = ref(false);
// wait container expand
nextTick(() => {
  renderChart.value = true;
});
</script>

<template>
  <VCharts
    v-if="renderChart"
    v-bind="$attrs"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<style scoped>

</style>
