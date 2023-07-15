import { uniqBy } from "@celeris/utils";
import { computed, toRaw } from "vue";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";

export function useFrameKeepAlive() {
  const router = useRouter();
  const { currentRoute } = router;
  const getFramePages = computed(() => {
    return getAllFramePages(toRaw(router.getRoutes()));
  });

  function getAllFramePages(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    let framePages: RouteRecordRaw[] = [];
    for (const route of routes) {
      const { meta: { iframeLink } = {}, children } = route;
      if (iframeLink) {
        framePages.push(route);
      }
      if (children && children.length) {
        framePages.push(...getAllFramePages(children));
      }
    }
    framePages = uniqBy(framePages, "name");
    return framePages;
  }

  function showIframe(item: RouteRecordRaw) {
    return item.name === currentRoute.value.name;
  }

  function hasRenderFrame(name: RouteRecordName) {
    return currentRoute.value.name === name;
  }

  return {
    hasRenderFrame,
    getFramePages,
    showIframe,
    getAllFramePages,
  };
}
