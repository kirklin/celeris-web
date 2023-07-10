<script setup lang="ts">
import { earningsIndicator, interwovenReflections, totalIncomeIndicator } from "@celeris/assets";
import LoginForm from "~/pages/login/components/LoginForm.vue";

defineOptions({
  name: "Login",
});
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
    <div
      class="flex-[1.7] dark:bg-[rgb(33,41,70)] bg-white h-[100vh] relative <lg:hidden"
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
    </div>
    <div class="flex-[2.5] flex justify-center">
      <div class="dark:bg-[rgb(33,41,70)] w-[500px] px-[32px] py-[30px] mt-[-12%] bg-white rounded-lg <lg:(w-[94%] mx-auto)">
        <div class="text-center">
          <div class="flex justify-center gap-2">
            <CAAppLogo title-size="3xl" />
          </div>
          <h3
            class="dark:(text-white) text-[rgba(0,0,0,.45)] mb-[1em] text-[14px] font-normal"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  </main>
</template>

<style scoped>
.total-income-indicator-img {
  animation: total-income-indicator-img-anim 10s linear 0ms infinite normal backwards;
}

.earnings-indicator-img {
  animation: earnings-indicator-img-anim 8s linear 0ms infinite normal backwards;
}

@keyframes total-income-indicator-img-anim {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0px, 30px, 0)
  }

  100% {
    transform: translate3d(0px, 0px, 0)
  }
}

@keyframes earnings-indicator-img-anim {
  0% {
    transform: translate3d(0px, 0px, 0)
  }

  50% {
    transform: translate3d(0px, 20px, 0)
  }

  100% {
    transform: translate3d(0px, 0px, 0)
  }
}

.custom.slick-dots .slick-active button {
  background: #000 !important;
}

.custom.slick-dots button {
  background: rgba(0, 0, 0, .7) !important;
}
</style>
