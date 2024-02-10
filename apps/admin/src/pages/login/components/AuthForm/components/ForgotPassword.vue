<script lang="ts" setup>
import { ref } from "vue";

import {
  type FormInst,
  type FormRules,
  type FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from "naive-ui";
import type { ForgotPasswordFromType } from "~/pages/login/types";

const { t } = useI18n();
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const { loading, setLoading } = useLoading(false);
const model = ref<ForgotPasswordFromType>({
  phoneNumber: "",
});

const rules: FormRules = {
  phoneNumber: [
    {
      required: true,
      trigger: ["blur"],
      message: t("page.login.form.forgotPassword.requiredError"),
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: t("page.login.form.forgotPassword.invalidFormatError"),
    },
  ],
};

function forgotPassword(e: Event) {
  e.preventDefault();
  setLoading(true);
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    setLoading(false);
    if (!errors) {
      message.success(t("page.login.form.resetLinkSentMessage"));
    }
  });
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules">
    <NFormItem path="phoneNumber" :label="t('page.login.form.forgotPassword.label')">
      <NInput
        v-model:value="model.phoneNumber"
        :placeholder="t('page.login.form.forgotPassword.placeholder')"
        size="large"
        @keydown.enter="forgotPassword"
      />
    </NFormItem>
    <div class="flex flex-col items-end gap-6">
      <div class="w-full">
        <NButton type="primary" :loading="loading" class="!w-full" size="large" @click="forgotPassword">
          {{ t('page.login.form.sendResetLinkButton') }}
        </NButton>
      </div>
    </div>
  </NForm>
</template>
