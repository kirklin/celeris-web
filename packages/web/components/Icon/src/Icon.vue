<script setup lang="ts">
import { NIcon, NIconWrapper } from "naive-ui";
import { Icon, type IconifyIcon, loadIcon } from "@iconify/vue";
import { computed, ref, watchEffect } from "vue";
import { isNil } from "@celeris/utils";
import { normalizeIconName } from "./utils";

interface IconOptions {
  name?: string;
  icon?: string;
  size?: number;
  bgSize?: number;
  color?: string;
  iconColor?: string;
  bgColor?: string;
  borderRadius?: number;
  depth?: 1 | 2 | 3 | 4 | 5;
}
const props = defineProps<Omit<IconOptions, "iconColor">>();
const shouldUseWrapper = computed(() => !!(props.bgColor || props.bgSize || props.borderRadius));
const componentToRender = computed(() => (shouldUseWrapper.value ? NIconWrapper : NIcon));

const options = computed(() => {
  const opt: IconOptions = {};
  if (shouldUseWrapper.value) {
    if (!isNil(props.bgSize)) {
      opt.size = props.bgSize;
    }
    if (!isNil(props.bgColor)) {
      opt.color = props.bgColor;
    }
    if (!isNil(props.borderRadius)) {
      opt.borderRadius = props.borderRadius;
    }
    if (!isNil(props.color)) {
      opt.iconColor = props.color;
    }
  } else {
    if (!isNil(props.color)) {
      opt.color = props.color;
    }
    if (!isNil(props.depth)) {
      opt.depth = props.depth;
    }
    if (!isNil(props.size)) {
      opt.size = props.size;
    }
  }
  return opt;
});

const loadIconByName = (name: string) => loadIcon(name).catch(() => console.error(`Failed to load icon ${name}`));

const icon = ref<void | Required<IconifyIcon>>();

function setIcon(name: string | undefined) {
  if (!isNil(name)) {
    name = normalizeIconName(name);
    loadIconByName(name).then(res => (icon.value = res));
  }
}

watchEffect(() => {
  if (!isNil(props.icon)) {
    setIcon(props.icon);
  } else {
    setIcon(props.name);
  }
});
</script>

<template>
  <component :is="componentToRender" v-bind="options">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <Icon v-if="icon" :icon="icon" :width="size" :height="size" />
    </template>
  </component>
</template>
