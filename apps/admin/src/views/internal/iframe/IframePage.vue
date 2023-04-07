<!--
*  @description: IframePage
*  @Author: Kirk lin
*  @createdTime: 2023-04-07 13:45
 -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  frameSrc: string;
}>(), {
  frameSrc: "",
});
</script>

<template>
  <div>
    <iframe
      :src="frameSrc"
      style="width: 100%; height: 100%;"
    />
  </div>
</template>

<style scoped>

</style>
