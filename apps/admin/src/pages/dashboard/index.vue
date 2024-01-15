<script setup lang="ts">
import UserAnalysis from "~/pages/dashboard/components/UserAnalysis.vue";
import DataOverview from "~/pages/dashboard/components/DataOverview.vue";
import PerformanceMetrics from "~/pages/dashboard/components/PerformanceMetrics.vue";
import APIHealthMetrics from "~/pages/dashboard/components/APIHealthMetrics.vue";
import PageWrapper from "~/component/PageWrapper/src/PageWrapper.vue";

defineOptions({
  name: "Dashboard",
});
</script>

<template>
  <PageWrapper>
    <NScrollbar class="rounded-2xl">
      <NSpace :vertical="true" :size="16">
        <NGrid cols="24" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
          <NGridItem span="24 l:18">
            <!--      数据总览 -->
            <DataOverview />
          </NGridItem>
          <NGridItem span="24 l:6">
            <!-- 性能指标和API健康指标组件 -->
            <NSpace :vertical="true" :size="16">
              <PerformanceMetrics />
              <APIHealthMetrics />
            </NSpace>
          </NGridItem>
        </NGrid>
        <!-- 用户分析模块 -->
        <UserAnalysis />
        <NGrid cols="1 m:2" responsive="screen" :x-gap="16" :y-gap="16">
          <NGridItem>
            <!-- TODO: 热门AI助手展示组件 -->
            <!--          <PopularAssistants /> -->
          </NGridItem>
          <NGridItem>
            <!-- TODO: 回复类型占比组件 -->
            <!--          <ResponseTypeDistribution /> -->
          </NGridItem>
        </NGrid>
      </NSpace>
    </NScrollbar>
  </PageWrapper>
</template>

<style scoped>
</style>
