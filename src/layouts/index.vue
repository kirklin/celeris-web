<script setup lang="ts">
import { useRoute } from "vue-router";
import Menu from "./menu/index.vue";
import Footer from "./footer/index.vue";
import Header from "./header/index.vue";
const route = useRoute();
</script>

<template>
  <ElContainer class="flex h-full w-full min-w-[970px]">
    <ElAside class="w-auto">
      <Menu />
    </ElAside>
    <ElContainer class="flex h-full w-full min-w-[970px] dark:bg-gray-900">
      <ElHeader>
        <Header />
      </ElHeader>
      <ElMain class="overflow-x-hidden rounded-2xl">
        <div class="min-h-full w-full rounded-2xl bg-gray-100 p-4 dark:bg-gray-900">
          <RouterView v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </RouterView>
        </div>
      </ElMain>
      <ElFooter>
        <Footer />
      </ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
.ca-aside{
  width: auto;
}
.ca-header,
.ca-footer {
  height: auto;
  padding: 0;
}
.ca-main {
  @apply pl-0 pr-5 pt-0 pb-6;
}
</style>
