<script setup>
import { useI18n } from "vue-i18n";
import { isNil } from "@celeris/utils";
import { renderIcon } from "@celeris/components";
import { getCurrentParent } from "~/router/menus";

defineOptions({
  name: "LayoutBreadcrumb",
});

const { t, te } = useI18n();
const router = useRouter();
const route = useRoute();
const { currentRoute } = useRouter();
const breadcrumbs = ref([]);

function navigateTo(page) {
  const { name, path } = page;
  if (name && name !== route.name) {
    router.push({ name });
  } else if (path && path !== route.path) {
    router.push({ path });
  }
}

watchEffect(() => {
  const parentPath = getCurrentParent(currentRoute.value.path);
  if (parentPath) {
    breadcrumbs.value = parentPath.map(item => ({
      ...item,
      options: item.children?.map(child => ({
        ...child,
        key: isNil(child?.redirect) ? child.path : child?.redirect,
        children: undefined,
        label: localize(child.name),
        icon: renderIcon(child.icon),
      })),
    }));
  }
});

function localize(key) {
  return te(key) ? t(key) : key;
}

function selectDropdown(key) {
  navigateTo({ path: key });
}
</script>

<template>
  <NBreadcrumb class="breadcrumb">
    <NBreadcrumbItem @click="navigateTo({ path: '/' })">
      <CAIcon icon="tabler:home" :size="16" />
    </NBreadcrumbItem>
    <TransitionGroup name="breadcrumbAnimation">
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path">
        <NBreadcrumbItem>
          <NDropdown v-if="breadcrumb.children" :options="breadcrumb.options" @select="selectDropdown">
            <span>
              <CAIcon v-if="breadcrumb.icon" :icon="breadcrumb.icon" :size="16" class="inline-block align-text-bottom mr-4px text-16px" />
              <span>{{ localize(breadcrumb.name) }}</span>
            </span>
          </NDropdown>
          <template v-else>
            <CAIcon v-if="breadcrumb.icon" :icon="breadcrumb.icon" :size="16" class="inline-block align-text-bottom mr-2" />
            <span>{{ localize(breadcrumb.name) }}</span>
          </template>
        </NBreadcrumbItem>
      </template>
    </TransitionGroup>
  </NBreadcrumb>
</template>

<style scoped>
.breadcrumbAnimation-move,
.breadcrumbAnimation-enter-active {
  transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

.breadcrumbAnimation-leave-active {
  display: none;
}

.breadcrumbAnimation-enter-from {
  opacity: 0;
  transform: translateX(-5px);
}
</style>
