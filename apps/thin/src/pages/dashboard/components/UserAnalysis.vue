<script setup lang="ts">
import UserAnalysisItem from "~/pages/dashboard/components/UserAnalysisItem.vue";
</script>

<template>
  <NGrid cols="2 m:4" responsive="screen" :x-gap="16" :y-gap="16">
    <NGridItem>
      <UserAnalysisItem title="对话满意度趋势" chart-type="line" quota="user-heart" icon="tabler:user-heart" />
    </NGridItem>
    <NGridItem>
      <UserAnalysisItem title="用户消费趋势" chart-type="line" quota="user-dollar" icon="tabler:user-dollar" />
    </NGridItem>
    <NGridItem>
      <UserAnalysisItem title="用户分享趋势" chart-type="line" quota="user-share" icon="tabler:user-share" />
    </NGridItem>
    <NGridItem>
      <UserAnalysisItem title="用户增长量" chart-type="bar" quota="user-up" icon="tabler:user-up" />
    </NGridItem>
  </NGrid>
</template>

<style scoped>

</style>
