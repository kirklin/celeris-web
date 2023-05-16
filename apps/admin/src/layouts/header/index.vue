<script setup lang="ts">
import CollapseButton from "~/layouts/header/components/CollapseButton.vue";

defineOptions({
  name: "Header",
});
</script>

<template>
  <div class="flex h-16 items-center ">
    <div>
      <CollapseButton />
    </div>
  </div>
</template>

<style scoped>

</style>
