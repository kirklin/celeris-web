<script lang="ts" setup>
import { NText } from "naive-ui";

const { commandIcon, open } = useSearchDialog();

const { t } = useI18n();
</script>

<template>
  <NEl class="flex items-center rounded-2xl h-8 outline-none border-none search-btn" @click="open">
    <CAIcon name="tabler:search" :size="16" />
    <span>{{ t('searchDialog.searchPlaceholder') }}</span>
    <NText code class="search-command">
      <span :class="{ win: commandIcon === 'CTRL' }">{{ commandIcon }}</span>
      K
    </NText>
  </NEl>
</template>

<style scoped>
.search-btn {
  background-color: var(--action-color);
  gap: 10px;
  cursor: pointer;
  padding: 4px 5px 4px 10px;
}
.search-btn .search-command span {
  line-height: 0;
  position: relative;
  top: 1px;
  font-size: 16px;
}
.search-btn .search-command span.win {
  font-size: inherit;
  top: 0;
}
.search-btn > .ca-icon {
  opacity: 0.5;
  transition: opacity 0.3s;
}
.search-btn > span {
  opacity: 0.5;
  padding-right: 2px;
  font-size: 14px;
  transition: opacity 0.3s;
}
.search-btn > code {
  background-color: var(--hover-color);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-right: 10px;
}
.search-btn:hover > .ca-icon {
  opacity: 0.9;
}
.search-btn:hover > span {
  opacity: 0.9;
}
@media (max-width: 1000px) {
  .search-btn {
    padding-right: 10px;
  }
  .search-btn > span {
    display: none;
  }
  .search-btn > .ca-text--code {
    display: none;
  }
}
</style>
