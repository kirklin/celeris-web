<script setup lang="ts">
withDefaults(defineProps<{
  iframeLink?: string;
  width?: number;
  height?: number;
}>(), {
  iframeLink: "",
  width: 0,
  height: 0,
});
const frameRef = ref<HTMLIFrameElement | null>();
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
