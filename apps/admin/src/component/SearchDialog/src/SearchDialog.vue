<script lang="ts" setup>
import type { ScrollbarInst } from "naive-ui";
import { isWindows } from "@celeris/utils";
import Highlighter from "headless-highlighter";
import type { Menu } from "@celeris/types";
import { useSearchDialog } from "~/composables/useSearchDialog";
import type { SearchGroup, SearchGroupItem, SearchGroups } from "~/component/SearchDialog/src/types";
import { getShallowMenus } from "~/router/menus";

const SearchIcon = "tabler:search";
const ArrowEnterIcon = "fluent:arrow-enter-left-24-regular";
const ArrowSortIcon = "fluent:arrow-sort-24-regular";
const FullScreenIcon = "tabler:maximize";
const CloseIcon = "tabler:x";
const { toggle: toggleFullScreen } = useFullscreen();

const router = useRouter();
const { t, te } = useI18n();
const isDialogVisible = ref(false);
const search = ref("");
const activeItem = ref<null | string | number>(null);
const scrollContent = ref<(ScrollbarInst & { $el: any }) | null>(null);

function i18nRender(key: string) {
  return te(key) ? t(key) : key;
}

function createRouterSearchGroupItem(item: Menu): SearchGroupItem {
  return {
    iconName: item.icon,
    iconImage: null,
    key: item.path,
    title: `${t("searchDialog.go")}${i18nRender(item.name)}`,
    label: t("searchDialog.shortcut"),
    action() {
      router.push({ path: item.path });
    },
  };
}

// 获取菜单数据
const shallowMenus = getShallowMenus();
const applicationRouterSearchGroupData: SearchGroup = reactive({
  name: t("searchDialog.applications"),
  items: shallowMenus.map(createRouterSearchGroupItem),
});

const searchGroups = ref<SearchGroups>([
  applicationRouterSearchGroupData,
  {
    name: t("searchDialog.chatBot"),
    items: [
      {
        iconName: null,
        iconImage: "https://avatars.githubusercontent.com/u/17453452",
        key: 4,
        title: "产品经理",
        label: "负责产品规划和功能开发的专业人员",
        action() {
          router.push({ path: "/chat" });
        },
      },
    ],
  },
  {
    name: t("searchDialog.actions"),
    items: [
      {
        iconName: FullScreenIcon,
        iconImage: null,
        key: 7,
        title: "Toggle fullscreen",
        label: t("searchDialog.action"),
        action() {
          toggleFullScreen();
        },
      },
    ],
  },
]);

const keywords = computed<string[]>(() => {
  return search.value.length > 1 ? search.value.split(" ").filter(k => k) : [];
});

const filteredGroups = computed<SearchGroups>(() => {
  if (keywords.value.length === 0) {
    return searchGroups.value;
  }

  const newGroups: SearchGroups = searchGroups.value.map((group) => {
    const items = group.items.filter((item) => {
      const titleMatch = keywords.value.some(k => item.title.toLowerCase().includes(k.toLowerCase()));
      const tagsMatch = item.tags && keywords.value.some(k => item.tags?.toLowerCase().includes(k.toLowerCase()));
      return titleMatch || tagsMatch;
    });

    return items.length ? { ...group, items } : null;
  }).filter(Boolean) as SearchGroups;

  return newGroups;
});

const filteredFlattenItems = computed<SearchGroupItem[]>(() => {
  return filteredGroups.value.flatMap(group => group.items);
});

function resetValues() {
  search.value = "";
  activeItem.value = null;
}
function openDialog(e?: MouseEvent) {
  if (!isDialogVisible.value) {
    isDialogVisible.value = true;
    setTimeout(resetValues, 100);
  }
  return e;
}

function closeDialog() {
  isDialogVisible.value = false;
  resetValues();
}
function executeAction(action: () => void) {
  action();
  closeDialog();
}
function updateActiveItem(increment: number) {
  const currentIndex = filteredFlattenItems.value.findIndex(item => item.key === activeItem.value);
  const lastIndex = filteredFlattenItems.value.length - 1;

  if (activeItem.value === null) {
    activeItem.value = filteredFlattenItems.value[0].key;
  } else if (currentIndex === 0 && increment === -1) {
    activeItem.value = filteredFlattenItems.value[lastIndex].key;
  } else if (currentIndex === lastIndex && increment === 1) {
    activeItem.value = filteredFlattenItems.value[0].key;
  } else {
    activeItem.value = filteredFlattenItems.value[currentIndex + increment].key;
  }
  centerActiveItem();
}

function moveNextItem() {
  updateActiveItem(1);
}

function movePrevItem() {
  updateActiveItem(-1);
}

function performAction() {
  const item = filteredFlattenItems.value.find(item => item.key === activeItem.value);
  if (item) {
    executeAction(item.action);
  }
}
function centerActiveItem() {
  const element = document.getElementById(activeItem.value?.toString() || "");
  if (element && scrollContent.value) {
    element.scrollIntoView({ block: "nearest" });
  }
}

onMounted(() => {
  const keys = useMagicKeys();
  const ActiveCMD = isWindows() ? keys["ctrl+k"] : keys["cmd+k"];
  const Enter = keys.enter;

  useSearchDialog().trigger(openDialog);

  whenever(ActiveCMD, () => {
    openDialog();
  });

  whenever(Enter, () => {
    if (isDialogVisible.value) {
      performAction();
    }
  });
});
</script>

<template>
  <NModal v-model:show="isDialogVisible" class="search-dialog">
    <NCard
      class="w-[650px]"
      content-style="padding: 0;"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="search-dialog-action-bar rounded-2xl" @keydown.up="movePrevItem()" @keydown.down="moveNextItem()">
        <div class="search-input flex items-center gap-5 px-5 h-12">
          <CAIcon :name="SearchIcon" :size="16" />
          <input v-model="search" :placeholder="t('searchDialog.searchPlaceholder')" class="grow bg-transparent outline-none border-none">
          <NText code>
            ESC
          </NText>
          <CAIcon :name="CloseIcon" :size="20" class="cursor-pointer" @click="closeDialog()" />
        </div>
        <NDivider />
        <NScrollbar ref="scrollContent" style="height: 400px">
          <div class="content-wrap">
            <div v-for="group of filteredGroups" :key="group.name" class="group">
              <div class="group-title">
                {{ group.name }}
              </div>
              <NEl class="group-list">
                <div
                  v-for="item of group.items"
                  :id="item.key.toString()"
                  :key="item.key"
                  class="item flex items-center my-2"
                  :class="{ active: item.key === activeItem }"
                  @click="executeAction(item.action)"
                >
                  <NEl class="icon">
                    <NAvatar v-if="item.iconImage" round :size="28" :src="item.iconImage" />
                    <CAIcon v-if="item.iconName" :name="item.iconName" :size="18" />
                  </NEl>
                  <div class="title grow">
                    <Highlighter
                      highlight-class-name="highlight"
                      :search-words="keywords"
                      :auto-escape="true"
                      :text-to-highlight="item.title"
                    />
                  </div>
                  <div class="label">
                    {{ item.label }}
                  </div>
                </div>
              </NEl>
            </div>
            <div v-if="!filteredGroups.length" class="group-empty">
              {{ t('searchDialog.noResultsFound', { search }) }}
            </div>
          </div>
        </NScrollbar>
        <NDivider />
        <NEl class="flex items-center justify-center space-x-4 py-2 text-xs">
          <div class="flex items-center space-x-1">
            <NEl class="w-4 h-4 bg-[var(--code-color)] rounded flex-center">
              <CAIcon :name="ArrowEnterIcon" :size="12" />
            </NEl>
            <span class="opacity-70">{{ t('searchDialog.toSelectTooltip') }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <NEl class="w-4 h-4 bg-[var(--code-color)] rounded flex-center">
              <CAIcon :name="ArrowSortIcon" :size="12" />
            </NEl>
            <span class="opacity-70">{{ t('searchDialog.toNavigateTooltip') }}</span>
          </div>
        </NEl>
      </div>
    </NCard>
  </NModal>
</template>

<style scoped>
.search-dialog .search-dialog-action-bar .search-input .ca-text--code {
  white-space: nowrap;
}
.search-dialog .search-dialog-action-bar .ca-divider {
  margin-top: 0;
  margin-bottom: 0;
}
.search-dialog .search-dialog-action-bar .content-wrap {
  padding-bottom: 30px;
}
.search-dialog .search-dialog-action-bar .content-wrap .group-empty {
  text-align: center;
  padding: 30px 0 40px 0;
}
.search-dialog .search-dialog-action-bar .content-wrap .group {
  padding: 0 10px;
}
.search-dialog .search-dialog-action-bar .content-wrap .group .group-title {
  opacity: 0.6;
  margin-bottom: 5px;
  padding: 20px 10px 5px;
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item {
  padding: 7px 10px;
  gap: 10px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  text-align: left;
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item
  .icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--code-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item
  .title {
  font-weight: bold;
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item
  .label {
  opacity: 0.8;
  font-size: 0.9em;
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item.active {
  background-color: var(--hover-color);
}
.search-dialog
  .search-dialog-action-bar
  .content-wrap
  .group
  .group-list
  .item:hover {
  box-shadow: 0 0 0 1px var(--primary-color-hover) inset;
}
</style>
