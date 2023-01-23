<script setup lang="ts">
import { useRoute } from "vue-router";
import Menu from "./menu/index.vue";
const route = useRoute();
</script>

<template>
  <ElContainer>
    <ElAside>
      <Menu />
    </ElAside>
    <ElContainer>
      <ElHeader>
        header
      </ElHeader>
      <ElMain>
        <RouterView v-slot="{ Component }">
          <transition>
            <section>
              <component :is="Component" :key="route.path" />
            </section>
          </transition>
        </RouterView>
      </ElMain>
      <ElFooter>
        footer
      </ElFooter>
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
</style>
