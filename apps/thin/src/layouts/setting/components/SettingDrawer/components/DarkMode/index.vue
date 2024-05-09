<script lang="ts" setup>
import { useThemeSetting } from "~/composables";
import { SettingMenu } from "~/layouts/setting/components/SettingDrawer/components";

defineOptions({ name: "DarkMode" });

const { getDarkMode, setDarkMode, getFollowSystemTheme, setFollowSystemTheme } = useThemeSetting();
const { t } = useI18n();
</script>

<template>
  <NDivider title-placement="center">
    {{ t('layouts.header.themeMode') }}
  </NDivider>
  <NSpace vertical size="large">
    <SettingMenu :label="t('layouts.header.darkMode')">
      <NSwitch :value="getDarkMode" @update:value="setDarkMode">
        <template #checked-icon>
          <span class="i-line-md-moon-rising-twotone-alt-loop" />
        </template>
        <template #unchecked-icon>
          <span class="i-line-md-moon-to-sunny-outline-loop-transition" />
        </template>
      </NSwitch>
    </SettingMenu>
    <SettingMenu :label="t('layouts.header.followSystem')">
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
