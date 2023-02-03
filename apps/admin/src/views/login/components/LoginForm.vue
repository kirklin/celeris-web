<script setup lang="ts">
import { PageConstants } from "@celeris/constants";
import type { FormInst, FormRules } from "naive-ui";

// 登录表单数据
import type { LoginFromType } from "~/views/login/types";
const message = useMessage();

const loginFormModel: LoginFromType = reactive<LoginFromType>({
  username: "kirklin",
  password: "kirklin",
});
const loginRules: FormRules = reactive({
  username: [{ required: true, message: "please input your username", trigger: "blur" }],
  password: [{ required: true, message: "please input your password", trigger: "blur" }],
});

const loading = ref<boolean>(false);
const loginFormRef = ref<HTMLElement & FormInst>();
const router = useRouter();
// login
const login = async () => {
  await loginFormRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        message.success("Login Success");
        router.push(PageConstants.BASE_HOME);
      }, 800);
    } else {
      message.error("Login Error");
      return false;
    }
  });
};
</script>

<template>
  <NForm ref="loginFormRef" :model="loginFormModel" :rules="loginRules" size="large" class="mt-8 space-y-6">
    <div>
      <NFormItem path="username" label="Your username">
        <NInput v-model:value="loginFormModel.username" placeholder="input any username" />
      </NFormItem>
    </div>
    <div>
      <NFormItem path="password" label="Your password">
        <NInput v-model:value="loginFormModel.password" type="password" placeholder="••••••••" show-password-on="click" @keydown.enter="login" />
      </NFormItem>
    </div>
    <!--    <div class="flex items-start"> -->
    <!--      <div class="flex h-5 items-center"> -->
    <!--        <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" required=""> -->
    <!--      </div> -->
    <!--      <div class="ml-3 text-sm"> -->
    <!--        <label for="remember" class="font-medium text-gray-900 dark:text-white">Remember me</label> -->
    <!--      </div> -->
    <!--      <a href="#" class="text-primary-700 dark:text-primary-500 ml-auto text-sm hover:underline">Lost Password?</a> -->
    <!--    </div> -->
    <NButton type="primary" :loading="loading" @click="login">
      Login to your account
    </NButton>
    <!--    <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> -->
    <!--      Not registered? <a class="text-primary-700 dark:text-primary-500 hover:underline">Create account</a> -->
    <!--    </div> -->
  </NForm>
</template>

<style scoped>

</style>
