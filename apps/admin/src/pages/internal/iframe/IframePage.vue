<script setup lang="ts">
withDefaults(defineProps<{
  iframeLink?: string;
}>(), {
  iframeLink: "",
});
const frameRef = ref<HTMLIFrameElement | null>();
const width = defineModel("width", { default: 0 });
const height = defineModel("height", { default: 0 });
const loading = ref(true);
function finishLoading() {
  loading.value = false;
}
</script>

<template>
  <div class="w-full h-full">
    <NSpin :show="loading">
      <iframe
        ref="frameRef"
        :src="iframeLink"
        :style="{ width: `${width}px`, height: `${height}px` }"
        class="rounded-2xl"
        @load="finishLoading"
      />
    </NSpin>
  </div>
</template>

<style scoped>

</style>
