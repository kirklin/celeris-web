<script setup lang="ts">
import { ElForm, ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { PageConstant } from "~/constant/pageConstant";

// 登录表单数据
import type { LoginFromType } from "~/views/login/types";

const loginFormModel: LoginFromType = reactive<LoginFromType>({
  username: "kirklin",
  password: "kirklin",
});
const loginRules: FormRules = reactive({
  username: [{ required: true, message: "please input your username", trigger: "blur" }],
  password: [{ required: true, message: "please input your password", trigger: "blur" }],
});

const loading = ref<boolean>(false);
const loginFormRef = ref<FormInstance>();
const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        ElMessage.success("Login Success");
        router.push(PageConstant.BASE_HOME);
      }, 800);
    } else {
      return false;
    }
  });
};
</script>

<template>
  <ElForm ref="loginFormRef" :model="loginFormModel" :rules="loginRules" size="large" class="mt-8 space-y-6">
    <div>
      <ElFormItem prop="username">
        <label for="username" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your username</label>
        <el-input v-model="loginFormModel.username" placeholder="kirklin" />
      </ElFormItem>
    </div>
    <div>
      <ElFormItem prop="password">
        <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <el-input v-model="loginFormModel.password" type="password" placeholder="••••••••" show-password />
      </ElFormItem>
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
    <el-button type="primary" :loading="loading" @click="login(loginFormRef)">
      Login to your account
    </el-button>
    <!--    <div class="text-sm font-medium text-gray-500 dark:text-gray-400"> -->
    <!--      Not registered? <a class="text-primary-700 dark:text-primary-500 hover:underline">Create account</a> -->
    <!--    </div> -->
  </ElForm>
</template>

<style scoped>

</style>
