<script setup lang="ts">
import { getTransitionName } from "~/layouts/transition";
import { useTransitionSetting } from "~/composables";

defineOptions({
  name: "ContentLayout",
});
const { getShouldEnableTransition } = useTransitionSetting();
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      appear :name="getTransitionName({ route },
                                      {
                                        enableTransition: getShouldEnableTransition,
                                      })" mode="out-in"
    >
      <Component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<style scoped>

</style>
