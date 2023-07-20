<script lang="ts" setup>
defineOptions({
  name: "Copy",
});
const message = useMessage();
const source = ref("");
function handleCopy() {
  message.success("复制成功！");
}
</script>

<template>
  <div class="h-full">
    <NCard title="文本复制">
      <NInputGroup>
        <NInput v-model:value="source" placeholder="请输入要复制的内容" />
        <NButton v-copy="source" type="primary" @click="handleCopy">
          复制
        </NButton>
      </NInputGroup>
    </NCard>
  </div>
</template>

<style scoped></style>
