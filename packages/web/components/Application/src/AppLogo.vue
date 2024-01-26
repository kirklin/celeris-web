<script setup lang="ts">
import { computed, toRefs, withDefaults } from "vue";
import { PageConstants, RouterTransitionConstants } from "@celeris/constants";
import { useRouter } from "vue-router";
import { logoImage } from "@celeris/assets";

const props = withDefaults(
  defineProps<{
    /**
     * 是否显示标题
     * Whether to display the title
     */
    displayTitle?: boolean;

    /**
     * 标题大小，使用 unocss 进行设置
     * Size of the title with unocss
     */
    titleSize?: string;

    /**
     * 是否使用迷你模式
     * Whether to use mini mode
     */
    isMini?: boolean;

    /**
     * 是否为深色主题，可选，不提供时使用系统默认
     * Whether it is a dark theme, optional, defaults to system default
     */
    isDarkMode?: boolean;
  }>(),
  { displayTitle: false, titleSize: "xl", isDarkMode: undefined, isMini: true },
);

const { displayTitle, titleSize, isMini, isDarkMode } = toRefs(props);

// 计算属性，获取应用程序名称
const applicationName = computed(() => String(import.meta.env.VITE_GLOB_APP_TITLE));

const router = useRouter();

// 导航到首页的函数
function navigateHome() {
  router.push(PageConstants.BASE_HOME);
}

// 计算属性，判断是否为深色主题
const isDarkTheme = computed(() => isDarkMode.value);

// 计算属性，判断是否为浅色主题
const isLightTheme = computed(() => !isDarkMode.value);
</script>

<template>
  <!-- 应用程序 Logo 区域 -->
  <div :class="`text-${titleSize}`" class="app-logo flex items-center h-full " @click="navigateHome">
    <!-- 根据主题和模式显示 Logo 图片 -->
    <Transition
      appear :name="RouterTransitionConstants.FADE" mode="in-out"
    >
      <img
        v-if="isDarkTheme && !isMini || isLightTheme && !isMini"
        :src="logoImage"
        class="block h-full max-h-8 m-3"
        alt="App Logo"
      >
      <img
        v-else-if="isDarkTheme && isMini || isLightTheme && isMini"
        :src="logoImage"
        class="block h-full max-h-8 m-3"
        alt="App Logo"
      >
    </Transition>
    <!-- 显示标题部分 -->
    <span v-show="displayTitle" class="font-semibold">{{ applicationName }}</span>
  </div>
</template>
