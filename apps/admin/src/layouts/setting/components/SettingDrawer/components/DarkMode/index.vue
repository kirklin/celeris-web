<script lang="ts" setup>
import { useThemeSetting } from "~/composables";
import { SettingMenu } from "~/layouts/setting/components/SettingDrawer/components";

defineOptions({ name: "DarkMode" });

const { getDarkMode, setDarkMode, getFollowSystemTheme, setFollowSystemTheme } = useThemeSetting();
</script>

<template>
  <NDivider title-placement="center">
    主题模式
  </NDivider>
  <NSpace vertical size="large">
    <SettingMenu label="深色主题">
      <NSwitch :value="getDarkMode" @update:value="setDarkMode">
        <template #checked-icon>
          <span class="i-line-md-moon-rising-twotone-alt-loop" />
        </template>
        <template #unchecked-icon>
          <span class="i-line-md-moon-to-sunny-outline-loop-transition" />
        </template>
      </NSwitch>
    </SettingMenu>
    <SettingMenu label="跟随系统">
      <NSwitch :value="getFollowSystemTheme" @update:value="setFollowSystemTheme">
        <template #checked-icon>
          <span class="i-material-symbols:brightness-auto-outline-rounded" />
        </template>
        <template #unchecked-icon>
          <span class="i-material-symbols:brightness-empty-outline-rounded" />
        </template>
      </NSwitch>
    </SettingMenu>
  </NSpace>
</template>

<style scoped></style>
