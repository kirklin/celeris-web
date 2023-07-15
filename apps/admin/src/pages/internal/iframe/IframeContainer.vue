<script setup lang="ts">
import type { RouteRecordName } from "vue-router";
import { useFrameKeepAlive } from "./useFrameKeepAlive";
import IframePage from "~/pages/internal/iframe/IframePage.vue";

defineOptions(
  {
    name: "IframeLayout",
  },
);
const { getCanEmbedIFramePage } = useAppSetting();
const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();

const showFrame = computed(() => toValue(getFramePages).length > 0);
const parentEl = useParentElement();

const { height, width } = useElementSize(parentEl);
</script>

<template>
  <div v-if="getCanEmbedIFramePage && showFrame" class="w-full h-full">
    <template v-for="frame in getFramePages" :key="frame.path">
      <IframePage
        v-if="frame?.meta?.iframeLink && hasRenderFrame(frame.name as RouteRecordName)"
        v-show="showIframe(frame)"
        :height="height"
        :width="width"
        :iframe-link="frame?.meta?.iframeLink as string"
      />
    </template>
  </div>
</template>
