<script setup lang="ts">
import { PageConstants } from "@celeris/constants";
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <PageWrapper>
    <NCard>
      <NSpace vertical size="large">
        <NResult status="error" :title="t('page.result.failPage.title')" :sub-title="t('page.result.failPage.subTitle')">
          <template #footer>
            <NSpace justify="center">
              <NButton type="primary" @click="router.push(PageConstants.BASE_HOME)">
                {{ t('page.result.failPage.buttons.home') }}
              </NButton>
              <NButton @click="router.back()">
                {{ t('page.result.failPage.buttons.back') }}
              </NButton>
            </NSpace>
          </template>
        </NResult>
        <NCard embedded :bordered="false">
          <NSpace vertical size="large">
            <NDescriptions label-placement="left">
              <template #header>
                <div class="font-black">
                  {{ t('page.result.failPage.errorHeader') }}
                </div>
              </template>
            </NDescriptions>
            <div class="flex">
              <div class="flex-center">
                <svg class="i-material-symbols-cancel text-error mr-2" />
              </div>
              {{ t('page.result.failPage.networkIssue') }}
              <a class="ml-4">{{ t('page.result.failPage.checkNetwork') }}</a>
            </div>
            <div class="flex">
              <div class="flex-center">
                <svg class="i-material-symbols-cancel text-error mr-2" />
              </div>
              {{ t('page.result.failPage.messageTooLong') }}
              <a class="ml-4">{{ t('page.result.failPage.viewHelp') }}</a>
            </div>
          </NSpace>
        </NCard>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>

<style scoped>

</style>
