<script setup lang="ts">
import HeroImg from "./images/ripple/hero.gif";

defineOptions({
  name: "Ripple",
});

const { t } = useI18n();
</script>

<template>
  <div class="h-full flex flex-row space-x-2xl">
    <NCard v-ripple class="bg-primary">
      <div class="space-y-3xl text-white text-chinese">
        <h1 class="text-7xl">
          {{ t("page.rippleDirective.ripple") }}
        </h1>
        <p class="text-xl">
          {{ t("page.rippleDirective.description1") }}
        </p>
        <p class="text-xl">
          {{ t("page.rippleDirective.description2") }}
        </p>
      </div>
    </NCard>
    <img
      :src="HeroImg"
      class="rounded-2xl object-cover min-h-[56px]"
      alt="Two containers that display a bounded and unbounded ripple on interaction."
      title="A bounded and unbounded ripple."
    >
  </div>
</template>

<style scoped>

</style>
