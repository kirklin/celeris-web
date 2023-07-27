<script setup lang="ts">
import { presetPrimaryColors } from "@celeris/utils";
import { ColorCheckbox } from "./components";

const { getThemeColor, setThemeColor } = useThemeSetting();
const { t } = useI18n();
</script>

<template>
  <NDivider title-placement="center">
    {{ t('layouts.header.systemTheme') }}
  </NDivider>
  <NGrid :cols="8" :x-gap="8" :y-gap="12">
    <NGridItem v-for="color in presetPrimaryColors" :key="color" class="flex-x-center">
      <ColorCheckbox :color="color" :checked="color === getThemeColor" @click="setThemeColor(color)" />
    </NGridItem>
  </NGrid>
  <NSpace :vertical="true" class="pt-12px">
    <NColorPicker :value="getThemeColor" :show-alpha="false" @update-value="setThemeColor" />
  </NSpace>
</template>

<style scoped>

</style>
