<script setup lang="ts">
const props = defineProps<{
  title: string;
  val?: number;
  currency?: string;
  centered?: boolean;
  horizontal?: boolean;
}>();
const { title, val, currency, centered, horizontal } = toRefs(props);

const valueString = computed(() => {
  const value = val?.value || 0;

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
  <NCard>
    <div class="flex items-center h-full">
      <div
        class="card-wrap flex gap-4 w-full"
        :class="{ 'items-center': centered, 'text-center': centered, 'flex-col': !horizontal }"
      >
        <div class="icon">
          <slot name="icon" />
        </div>
        <div class="info flex flex-col">
          <div class="value text-xl font-bold mb-2">
            {{ valueString }}
          </div>
          <div class="title break-inside-initial">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
</style>
