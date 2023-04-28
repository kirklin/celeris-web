import { ContentTypeConstants } from "@celeris/constants";
import type { GlobEnvConfig } from "@celeris/types";
import { getAppGlobalConfig } from "@celeris/utils";
import type { CreateAxiosOptions } from "../axiosTransform";
import { defaultTransform } from "./transform/defaultTransform";

const globalConfig = getAppGlobalConfig(<GlobEnvConfig>import.meta.env);
export const defaultAxiosOptions: CreateAxiosOptions = {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  // authentication schemes，e.g: Bearer
  // authenticationScheme: 'Bearer',
  authenticationScheme: "",
  timeout: 10 * 1000,
  // 基础接口地址
  // baseURL: globSetting.apiUrl,

  headers: { "Content-Type": ContentTypeConstants.JSON },
  // 如果是form-data格式
  // headers: { "Content-Type": ContentTypeConstants.FORM_URLENCODED },
  // 数据处理方式
  transform: defaultTransform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    shouldJoinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    shouldReturnNativeResponseHeaders: false,
    // 需要对返回数据进行处理
    shouldTransformResponse: true,
    // post请求的时候添加参数到url
    shouldJoinParamsToUrl: false,
    // 格式化提交参数时间
    shouldFormatDate: true,
    // 消息提示类型
    errorMessageMode: "message",
    // 接口地址
    apiUrl: globalConfig.API_URL,
    // 接口拼接地址
    urlPrefix: globalConfig.API_URL_PREFIX,
    //  是否加入时间戳
    shouldJoinTime: true,
    // 忽略重复请求
    shouldIgnoreAbortController: true,
    // 是否携带token
    shouldSendTokenInHeader: true,
    retryOptions: {
      shouldRetry: true,
      retryCount: 5,
      retryWaitTime: 100,
    },
  },
};
