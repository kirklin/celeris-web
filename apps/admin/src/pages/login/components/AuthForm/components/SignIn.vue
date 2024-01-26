<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { useI18n } from "@celeris/locale";
import { useUserStore } from "~/store/modules/user";

// 登录表单数据
import type { SignInFromType } from "~/pages/login/types";

const emit = defineEmits<{
  (e: "forgot-password"): void;
}>();

const { t } = useI18n();

const message = useMessage();
const notification = useNotification();

const loginFormModel: SignInFromType = reactive<SignInFromType>({
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
async function signIn(e: Event) {
  e.preventDefault();
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
  <NForm ref="loginFormRef" :model="loginFormModel" :rules="loginRules">
    <NFormItem path="username" :label="t('page.login.form.username.label')">
      <NInput
        v-model:value="loginFormModel.username" :placeholder="t('page.login.form.username.placeholder')" size="large" autocomplete="on"
        @keydown.enter="signIn"
      />
    </NFormItem>
    <NFormItem path="password" :label="t('page.login.form.password.label')">
      <NInput
        v-model:value="loginFormModel.password" type="password" :placeholder="t('page.login.form.password.placeholder')"
        show-password-on="click" autocomplete="on"
        size="large"
        @keydown.enter="signIn"
      />
    </NFormItem>
    <div class="flex flex-col items-end gap-6">
      <div class="flex justify-between w-full">
        <NCheckbox size="large">
          {{ t('page.login.form.remember') }}
        </NCheckbox>
        <NButton text type="primary" @click="emit('forgot-password')">
          {{ t('page.login.form.forgetPassword') }}
        </NButton>
      </div>
      <div class="w-full">
        <NButton type="primary" :loading="loading" class="w-full!" size="large" @click="signIn">
          {{ t('page.login.form.loginButton') }}
        </NButton>
      </div>
    </div>
  </NForm>
</template>
