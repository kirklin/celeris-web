<script setup lang="ts">
import CollapseButton from "~/layouts/header/components/CollapseButton.vue";
import FullScreenButton from "~/layouts/header/components/FullScreenButton.vue";
import LocaleSwitcher from "~/layouts/header/components/LocaleSwitcher.vue";
import UserInfoButton from "~/layouts/header/components/UserInfoButton.vue";
import SettingButton from "~/layouts/setting/index.vue";
import Breadcrumb from "~/layouts/header/components/Breadcrumb.vue";
import SearchAnyWhere from "~/layouts/header/components/SearchAnyWhere.vue";
import LayoutTabs from "~/layouts/tabs/index.vue";

defineOptions({
  name: "HeaderLayout",
});
</script>

<template>
  <div class="flex h-16 items-center <lg:justify-end">
    <div class="md:block px-4">
      <CollapseButton />
    </div>
    <div class="flex-1 <lg:hidden">
      <Breadcrumb />
    </div>
    <div class="flex flex-grow-1 items-center <2xl:hidden">
      <LayoutTabs />
    </div>
    <div class="flex">
      <NSpace>
        <SearchAnyWhere />
        <div class="flex items-center justify-center">
          <NSpace>
            <FullScreenButton />

            <LocaleSwitcher />

            <SettingButton />
          </NSpace>
        </div>
      </NSpace>
    </div>
    <div class="px-4">
      <UserInfoButton />
    </div>
  </div>
</template>

<style scoped>

</style>
