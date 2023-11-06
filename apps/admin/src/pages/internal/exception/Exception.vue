<script setup lang="ts">
import { HttpStatusConstants, PageConstants } from "@celeris/constants";
import { checkStatus } from "@celeris/request";
import { getErrorMessage } from "@celeris/utils";

const props = withDefaults(defineProps<exceptionProps>(), {
  status: HttpStatusConstants.NotFound,
});

enum StatusType {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
}
interface exceptionProps {
  status?: number;
  title?: string;
  description?: string;
}
const router = useRouter();
const title = ref<string>("");
const statusType = ref<StatusType>(StatusType.Error);

function getStatusType(status: number): StatusType {
  if (status >= 500) {
    return StatusType.Error;
  } else if (status >= 400) {
    return StatusType.Error;
  } else if (status >= 300) {
    return StatusType.Warning;
  } else if (status >= 200) {
    return StatusType.Success;
  } else {
    return StatusType.Info;
  }
}

onMounted(() => {
  try {
    statusType.value = getStatusType(props.status);
    checkStatus(props.status);
  } catch (error: any) {
    title.value = `${props.status} ${getErrorMessage(error)}`;
  }
});
</script>

<template>
  <NResult class="p-4" :status="statusType" :title="title" :description="description" size="large">
    <template #footer>
      <NSpace justify="center">
        <NButton type="primary" @click="router.push(PageConstants.BASE_HOME)">
          返回主页
        </NButton>
        <NButton @click="router.back()">
          返回上一级
        </NButton>
      </NSpace>
    </template>
  </NResult>
</template>
