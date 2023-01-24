<script setup lang="ts">
import LoginForm from "~/views/login/components/LoginForm.vue";
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-900">
    <div class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <div class="mb-8 lg:mb-10">
        <AppLogo title-size="2xl" />
      </div>
      <!-- Card -->
      <div class="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to platform
        </h2>
        <LoginForm />
      </div>
    </div>
  </main>
</template>
