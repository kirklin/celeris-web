<script setup lang="ts">
import CollapseButton from "~/layouts/header/components/CollapseButton.vue";
import FullScreenButton from "~/layouts/header/components/FullScreenButton.vue";

defineOptions({
  name: "Header",
});
</script>

<template>
  <div class="flex h-16 items-center">
    <div class="hidden md:block px-4">
      <CollapseButton />
    </div>
    <div class="flex-grow-1" />
    <div class="flex">
      <div class="flex items-center justify-center">
        <div class="px-2">
          <FullScreenButton />
        </div>
      </div>
    </div>
    <div class="hidden md:block px-4" />
  </div>
</template>

<style scoped>

</style>
