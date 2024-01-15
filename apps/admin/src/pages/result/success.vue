<script setup lang="ts">
import { PageConstants } from "@celeris/constants";
import { formatToDateTime } from "@celeris/utils";
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

const router = useRouter();
const { t } = useI18n();
const state = reactive({
  generatedTime: formatToDateTime(new Date()),
  generator: "ChatGPT",
});
</script>

<template>
  <PageWrapper>
    <NCard>
      <NSpace vertical size="large">
        <NResult status="success" :title="t('page.result.successPage.title')" :sub-title="t('page.result.successPage.subTitle')">
          <template #footer>
            <NSpace justify="center">
              <NButton type="primary" @click="router.push(PageConstants.BASE_HOME)">
                {{ t('page.result.successPage.buttons.home') }}
              </NButton>
            </NSpace>
          </template>
        </NResult>
        <NCard embedded :bordered="false">
          <NSpace vertical size="large">
            <NDescriptions label-placement="left">
              <template #header>
                <div class="font-black">
                  {{ t('page.result.successPage.contentHeader') }}
                </div>
              </template>
              <NDescriptionsItem :label="t('page.result.successPage.generatedTimeLabel')">
                {{ state.generatedTime }}
              </NDescriptionsItem>
              <NDescriptionsItem :label="t('page.result.successPage.generatorLabel')">
                {{ state.generator }}
              </NDescriptionsItem>
              <NDescriptionsItem :label="t('page.result.successPage.contentLabel')">
                {{ t("page.result.successPage.generatedContent") }}
              </NDescriptionsItem>
            </NDescriptions>
            <NSteps :current="3" progress-dot size="small">
              <NStep :title="t('page.result.successPage.step1')" />
              <NStep :title="t('page.result.successPage.step2')">
                <p>{{ t('page.result.successPage.step2Content') }}</p>
              </NStep>
              <NStep :title="t('page.result.successPage.step3')">
                <p>{{ t('page.result.successPage.step3Content') }}</p>
              </NStep>
              <NStep :title="t('page.result.successPage.step4')" />
            </NSteps>
          </NSpace>
        </NCard>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>
