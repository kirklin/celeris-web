<script lang="ts" setup>
import { NButton, NDivider } from "naive-ui";
import { computed, onBeforeMount, ref } from "vue";
import { RouterTransitionConstants } from "@celeris/constants";
import SignIn from "~/pages/login/components/AuthForm/components/SignIn.vue";
import SignUp from "~/pages/login/components/AuthForm/components/SignUp.vue";
import ForgotPassword from "~/pages/login/components/AuthForm/components/ForgotPassword.vue";
import type { AuthFormType } from "~/pages/login/types";

const props = defineProps<{
  type?: AuthFormType;
}>();
const { t } = useI18n();
const typeRef = ref<AuthFormType>("signIn");

const title = computed<string>(() =>
  typeRef.value === "signIn" ? t("page.login.form.welcomeBackTitle") : typeRef.value === "signUp" ? t("page.login.form.helloTitle") : t("page.login.form.forgotPasswordTitle"),
);

function gotoSignIn() {
  typeRef.value = "signIn";
}
function gotoSignUp() {
  typeRef.value = "signUp";
}
function gotoForgotPassword() {
  typeRef.value = "forgotPassword";
}

onBeforeMount(() => {
  if (props.type) {
    typeRef.value = props.type;
  }
});
</script>

<template>
  <div class="auth-form-wrap w-full ">
    <CAAppLogo class="mb-4" display-title />
    <div class="title mb-4 text-3xl font-bold">
      {{ title }}
    </div>
    <div class="text mb-12 text-xl">
      {{ t('page.login.form.greetingText') }}
    </div>

    <div class="form">
      <Transition
        appear :name="RouterTransitionConstants.FADE_SLIDE" mode="out-in"
      >
        <SignIn v-if="typeRef === 'signIn'" key="signin" @forgot-password="gotoForgotPassword()" />
        <ForgotPassword v-else-if="typeRef === 'forgotPassword'" key="forgotpassword" />
        <SignUp v-else-if="typeRef === 'signUp'" key="signup" />
      </Transition>
    </div>

    <NDivider title-placement="center">
      Or
    </NDivider>

    <div class="social-button-group flex flex-col gap-4 mb-12">
      <NButton strong secondary size="large">
        <CAIcon icon="tabler:brand-qq" class="mr-4" />
        {{ t('page.login.form.socialButtons.signInWithQQ') }}
      </NButton>
      <NButton strong secondary>
        <CAIcon icon="tabler:brand-wechat" class="mr-4" />
        {{ t('page.login.form.socialButtons.signInWithWeChat') }}
      </NButton>
    </div>

    <div class="sign-text text-center">
      <div v-if="typeRef === 'signIn'" class="sign-text">
        {{ t('page.login.form.signText.signIn') }}
        <NButton text type="primary" size="large" @click="gotoSignUp()">
          {{ t('page.login.form.signUp') }}
        </NButton>
      </div>
      <div v-if="typeRef === 'forgotPassword'" class="sign-text">
        <NButton text type="primary" size="large" @click="gotoSignIn()">
          {{ t('page.login.form.signText.forgotPassword') }}
        </NButton>
      </div>
      <div v-if="typeRef === 'signUp'" class="sign-text">
        {{ t('page.login.form.signText.signUp') }}
        <NButton text type="primary" size="large" @click="gotoSignIn()">
          {{ t('page.login.form.signIn') }}
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-wrap {
  min-width: 270px;
  max-width: 400px;
}
</style>
