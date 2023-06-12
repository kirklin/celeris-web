<script setup lang="ts">
import { useHeaderSetting } from "~/composables";
import { DarkMode } from "~/layouts/setting/components/SettingDrawer/components";

defineOptions({
  name: "SettingDrawer",
});
const { getShouldShowSettingDrawer, setShouldShowSettingDrawer } = useHeaderSetting();
</script>

<template>
  <NDrawer
    :show="getShouldShowSettingDrawer" display-directive="show" width="25%"
    @mask-click="setShouldShowSettingDrawer(false)"
  >
    <NDrawerContent title="Project Setting" :native-scrollbar="false">
      <DarkMode />
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>

</style>
