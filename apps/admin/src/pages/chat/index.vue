<script setup lang="ts">
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";
import ChatLayout from "./components/ChatLayout.vue";

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
