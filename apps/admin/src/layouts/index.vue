<script setup lang="ts">
import Footer from "./footer/index.vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import SearchDialog from "~/component/SearchDialog/src/SearchDialog.vue";
import SidebarLayout from "~/layouts/sidebar/index.vue";

defineOptions({
  name: "Layout",
});
</script>

<template>
  <NEl tag="div" class="flex flex-row flex-1 h-full w-full">
    <div>
      <SidebarLayout />
    </div>
    <div class="flex flex-col flex-1 h-full w-full">
      <header class="">
        <Header />
      </header>
      <div class="block flex-1 h-full overflow-x-hidden rounded-2xl pl-0 pr-5 pt-0 pb-6">
        <div class="min-h-full h-full w-full rounded-2xl common-bg p-4">
          <Content />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
    <SearchDialog />
  </NEl>
</template>

<style scoped>
</style>
