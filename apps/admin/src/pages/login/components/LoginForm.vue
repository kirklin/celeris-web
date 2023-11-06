<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useI18n } from "@celeris/locale";
import { useUserStore } from "~/store/modules/user";

// 登录表单数据
import type { LoginFromType } from "~/pages/login/types";

const { t } = useI18n();

const message = useMessage();
const notification = useNotification();

const loginFormModel: LoginFromType = reactive<LoginFromType>({
  username: "kirklin",
  password: "123456",
});
const loginRules: FormRules = reactive({
  username: [{ required: true, message: t("page.login.form.username.error"), trigger: "blur" }],
  password: [{ required: true, message: t("page.login.form.password.error"), trigger: "blur" }],
});

const loading = ref<boolean>(false);
const loginFormRef = ref<HTMLElement & FormInst>();

/**
 * This function handles the login process
 */
async function login() {
  try {
    // Validate the login form
    const errors = await loginFormRef.value?.validate();
    if (errors) {
      return;
    }

    loading.value = true;

    try {
      // Login the user
      const userInfo = await useUserStore().login({
        ...unref(loginFormModel),
        remember: true,
        errorMessageMode: "none",
      });
      if (userInfo) {
        notification.success({
          title: t("page.login.notification.loginSuccessMessage"),
          content: t("page.login.notification.welcomeBackMessage", { username: userInfo.fullName }),
        });
      }
    } catch (error) {
      message.error(t("page.login.form.incorrectAccountOrPassword"));
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NForm ref="loginFormRef" :model="loginFormModel" :rules="loginRules" size="large" class="mt-8 space-y-6">
    <div>
      <NFormItem path="username" :label="t('page.login.form.username.label')">
        <NInput v-model:value="loginFormModel.username" :placeholder="t('page.login.form.username.placeholder')" />
      </NFormItem>
    </div>
    <div>
      <NFormItem path="password" :label="t('page.login.form.password.label')">
        <NInput v-model:value="loginFormModel.password" type="password" :placeholder="t('page.login.form.password.placeholder')" show-password-on="click" @keydown.enter="login" />
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
      {{ t('page.login.form.loginButton') }}
    </NButton>
    <!--    <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> -->
    <!--      Not registered? <a class="text-primary-700 dark:text-primary-500 hover:underline">Create account</a> -->
    <!--    </div> -->
  </NForm>
</template>

<style scoped>

</style>
