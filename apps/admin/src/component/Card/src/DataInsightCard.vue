<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    chartType?: string;
    chartHeight?: number;
    currency?: string;
    hoverable?: boolean;
    dataCount?: number;
  }>(),
  { chartHeight: 80, chartBarGradient: false, hoverable: true },
);
const { title, chartHeight, currency, dataCount } = toRefs(props);
const chart = ref();

const valueString = computed(() => {
  const value = dataCount?.value;

  if (!value) {
    return "";
  }

  if (currency?.value) {
    return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(value);
  } else {
    return new Intl.NumberFormat("zh-CN").format(value);
  }
});
</script>

<template>
  <NCard content-style="padding:0" :hoverable="hoverable" class="container-type inline-size">
    <div class="card-wrap flex flex-col justify-between h-full">
      <div class="header flex w-full py-$n-padding-top px-$n-padding-left">
        <div class="icon">
          <slot name="icon" />
        </div>
        <div class="info ml-4">
          <NStatistic :label="title" tabular-nums>
            <div v-if="$slots.default" class="value">
              <slot />
            </div>
            <div v-else>
              {{ valueString }}
            </div>
          </NStatistic>
        </div>
        <div class="ml-auto">
          <slot name="meta" />
        </div>
      </div>
      <div
        ref="chart"
        class="chart-wrapper overflow-hidden"
        :style="{ height: `${chartHeight}px` }"
      >
        <slot name="chart" />
      </div>
    </div>
  </NCard>
</template>

<style scoped>
</style>
