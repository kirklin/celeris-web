<script setup lang="ts">
import { earningsIndicator, interwovenReflections, totalIncomeIndicator } from "@celeris/assets";
import AuthForm from "~/pages/login/components/AuthForm/index.vue";

defineOptions({
  name: "Login",
});
</script>

<template>
  <NEl tag="main" class="bg-gray-100 dark:bg-[--base-color] flex justify-center items-center overflow-x-hidden">
    <NEl
      class="flex-[2.5] bg-[--body-color] h-[100vh] rounded-l rounded-[3rem] relative <lg:hidden"
      :style="{
        backgroundImage: `url(${interwovenReflections})`,
      }"
    >
      <div
        class="total-income-indicator-img w-[243px] h-[210px] bg-center absolute top-[23%] left-[37%] bg-[length:380] "
        :style="{
          backgroundImage: `url(${totalIncomeIndicator})`,
        }"
      />
      <div
        class="earnings-indicator-img w-[313px] h-[280px] bg-center absolute top-[32%] left-[40%] bg-[length:380]"
        :style="{
          backgroundImage: `url(${earningsIndicator})`,
        }"
      />
    </NEl>
    <div class="flex-[2.5] flex justify-center">
      <div class="w-[600px] px-[32px] py-[30px] mt-[-5%] rounded-2xl <lg:(w-[94%] mx-auto)">
        <AuthForm />
      </div>
    </div>
  </NEl>
</template>

<style scoped>
.total-income-indicator-img {
  animation: total-income-indicator-img-anim 10s linear 0ms infinite normal
    backwards;
}

.earnings-indicator-img {
  animation: earnings-indicator-img-anim 8s linear 0ms infinite normal backwards;
}

@keyframes total-income-indicator-img-anim {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0px, 30px, 0);
  }

  100% {
    transform: translate3d(0px, 0px, 0);
  }
}

@keyframes earnings-indicator-img-anim {
  0% {
    transform: translate3d(0px, 0px, 0);
  }

  50% {
    transform: translate3d(0px, 20px, 0);
  }

  100% {
    transform: translate3d(0px, 0px, 0);
  }
}

.custom.slick-dots .slick-active button {
  background: #000 !important;
}

.custom.slick-dots button {
  background: rgba(0, 0, 0, 0.7) !important;
}
</style>
