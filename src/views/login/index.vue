<script setup lang="ts">
const AppName = computed(() => String(import.meta.env.VITE_GLOB_APP_TITLE));
</script>

<template>
  <main class="bg-gray-50 dark:bg-gray-900">
    <div class="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 md:h-screen">
      <a href="#" class="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10">
        <img src="src/assets/logo.png" class="mr-4 h-11" alt="Logo">
        <span>{{ AppName }}</span>
      </a>
      <!-- Card -->
      <div class="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to platform
        </h2>
        <form class="mt-8 space-y-6" action="#">
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input id="email" type="email" name="email" class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:text-sm" placeholder="name@company.com" required="">
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input id="password" type="password" name="password" placeholder="••••••••" class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:text-sm" required="">
          </div>
          <div class="flex items-start">
            <div class="flex h-5 items-center">
              <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" required="">
            </div>
            <div class="ml-3 text-sm">
              <label for="remember" class="font-medium text-gray-900 dark:text-white">Remember me</label>
            </div>
            <a href="#" class="text-primary-700 dark:text-primary-500 ml-auto text-sm hover:underline">Lost Password?</a>
          </div>
          <button type="submit" class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4 sm:w-auto">
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Not registered? <a class="text-primary-700 dark:text-primary-500 hover:underline">Create account</a>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
