<script setup lang="ts">
import ChatLayout from "./components/ChatLayout.vue";
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

defineOptions({
  name: "Chat",
});
</script>

<template>
  <PageWrapper :use-scrollbar="false">
    <ChatLayout />
  </PageWrapper>
</template>

<style scoped>

</style>
