<script lang="ts" setup>
import { ref } from "vue";

import {
  type FormInst,
  type FormItemRule,
  type FormRules,
  type FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from "naive-ui";

import { useUserStore } from "~/store/modules/user";
import type { SignUpFromType } from "~/pages/login/types";

const { t } = useI18n();

const formRef = ref<FormInst | null>(null);

const model = ref<SignUpFromType>({
  username: "kirklin",
  password: "123456",
  confirmPassword: "123456",
});
const message = useMessage();
const notification = useNotification();
const rules: FormRules = {
  username: [
    {
      required: true,
      trigger: ["blur"],
      message: t("page.login.form.username.error"),
    },
  ],
  password: [
    {
      required: true,
      trigger: ["blur"],
      message: t("page.login.form.password.error"),
    },
  ],
  confirmPassword: [
    {
      required: true,
      trigger: ["blur"],
      message: t("page.login.form.confirmPassword.error"),
    },
    {
      validator: (rule: FormItemRule, value: string): boolean => {
        return value === model.value.password;
      },
      message: t("page.login.form.confirmPassword.validator"),
      trigger: ["blur", "password-input"],
    },
  ],
};

function signUp(e: Event) {
  e.preventDefault();
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      // Login the user
      const userInfo = await useUserStore().login({
        ...{
          username: "kirklin",
          password: "123456",
        },
        remember: true,
        errorMessageMode: "none",
      });
      if (userInfo) {
        notification.success({
          title: t("page.login.notification.loginSuccessMessage"),
          content: t("page.login.notification.welcomeBackMessage", { username: userInfo.fullName }),
        });
      }
    } else {
      message.error("Invalid credentials");
    }
  });
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules">
    <NFormItem path="username" :label="t('page.login.form.username.label')">
      <NInput v-model:value="model.username" size="large" :placeholder="t('page.login.form.username.placeholder')" @keydown.enter="signUp" />
    </NFormItem>
    <NFormItem path="password" :label="t('page.login.form.password.label')">
      <NInput
        v-model:value="model.password"
        type="password"
        size="large"
        show-password-on="click"
        :placeholder="t('page.login.form.password.placeholder')"
        @keydown.enter="signUp"
      />
    </NFormItem>
    <NFormItem path="confirmPassword" :label="t('page.login.form.confirmPassword.label')" first>
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        :disabled="!model.password"
        size="large"
        show-password-on="click"
        :placeholder="t('page.login.form.confirmPassword.placeholder')"
        @keydown.enter="signUp"
      />
    </NFormItem>
    <div class="flex flex-col items-end">
      <div class="w-full">
        <NButton type="primary" class="!w-full" size="large" @click="signUp">
          {{ t('page.login.form.registerButton') }}
        </NButton>
      </div>
    </div>
  </NForm>
</template>
