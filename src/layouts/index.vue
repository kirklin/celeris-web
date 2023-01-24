<script setup lang="ts">
import { useRoute } from "vue-router";
import Menu from "./menu/index.vue";
import Footer from "./footer/index.vue";
import Header from "./header/index.vue";
const route = useRoute();
</script>

<template>
  <ElContainer class="flex h-full w-full min-w-[970px]">
    <ElAside class=" w-auto">
      <Menu />
    </ElAside>
    <ElContainer class="flex h-full w-full min-w-[970px]">
      <ElHeader>
        <Header />
      </ElHeader>
      <ElMain class="overflow-x-hidden bg-amber-300 px-3 py-2">
        <div class="h-full w-full bg-gray-100">
          <RouterView v-slot="{ Component }">
            <transition>
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
</style>
