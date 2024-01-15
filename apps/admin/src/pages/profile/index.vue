<script lang="ts" setup>
import type { UserInfo } from "@celeris/types";
import { useUserStore } from "~/store/modules/user";
import ToolTipper from "~/component/ActionIcon/src/ToolTipper.vue";
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

const ROLE_ICON = "tabler:user";
const LOCATION_ICON = "tabler:map-pin";
const MAIL_ICON = "tabler:mail";
const PHONE_ICON = "tabler:phone";

const tabActive = ref("settings");
const userStore = useUserStore();
const userInfo = toRef<UserInfo | null>(userStore.getUserInfo);
</script>

<template>
  <PageWrapper>
    <NCard class="header flex flex-col" :content-style="{ padding: 0 }">
      <div class="user-info flex flex-wrap gap-8 p-8 pb-6 border-b border-solid">
        <div class="avatar relative h-24">
          <NAvatar round :src="userInfo?.avatarUrl" :size="80" />
        </div>
        <div class="info grow flex flex-col justify-center">
          <div class="name mb-4">
            <h1 class="lg:text-2xl md:text-lg sm:text-base font-bold">
              {{ userInfo?.fullName }}
            </h1>
          </div>
          <NSpace size="large">
            <ToolTipper tooltip-text="Roles" placement="top">
              <div class="tooltip-wrap flex items-center">
                <CAIcon :name="ROLE_ICON" />
                <span class="line-height-1 ml-2">{{ userInfo?.roles }}</span>
              </div>
            </ToolTipper>
            <ToolTipper tooltip-text="Location" placement="top">
              <div class="tooltip-wrap flex items-center">
                <CAIcon :name="LOCATION_ICON" />
                <span class="line-height-1 ml-2">China</span>
              </div>
            </ToolTipper>
            <ToolTipper tooltip-text="Email" placement="top">
              <div class="tooltip-wrap flex items-center">
                <CAIcon :name="MAIL_ICON" />
                <span class="line-height-1 ml-2">{{ userInfo?.email }}</span>
              </div>
            </ToolTipper>
            <ToolTipper tooltip-text="Contacts" placement="top">
              <div class="tooltip-wrap flex items-center">
                <CAIcon :name="PHONE_ICON" />
                <span class="line-height-1 ml-2">{{ userInfo?.phone }}</span>
              </div>
            </ToolTipper>
          </NSpace>
        </div>
      </div>
      <div class="section-selector p-5 md:p-6 pt-0">
        <NTabs v-model:value="tabActive">
          <NTab name="settings">
            Settings
          </NTab>
        </NTabs>
      </div>
    </NCard>
    <div class="main mt-8">
      <NTabs v-model:value="tabActive" :tab-style="{ display: 'none' }" animated>
        <NTabPane name="settings">
          <!-- TODO ProfileSettings -->
        </NTabPane>
      </NTabs>
    </div>
  </PageWrapper>
</template>

<style scoped>
</style>
