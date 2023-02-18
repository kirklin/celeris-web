import { RequestConstants } from "@celeris/constants";
import type { RequestOptions, RequestResult } from "@celeris/types/src/httpClient";
import { isString } from "@celeris/utils";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { AxiosTransform, CreateAxiosOptions } from "../../axiosTransform";
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from "../../utils";

export const defaultTransform: AxiosTransform = {
  /**
   * A function that is called before a request is sent. It can modify the request configuration as needed.
   * 在发送请求之前调用的函数。它可以根据需要修改请求配置。
   */
  beforeRequest(config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig {
    const { apiUrl, shouldJoinPrefix, shouldJoinParamsToUrl, shouldFormatDate, shouldJoinTime = true, urlPrefix } = options;

    if (shouldJoinPrefix) {
      config.url = `${urlPrefix ?? ""}${config.url ?? ""}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url ?? ""}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    shouldFormatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestConstants.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = { ...params, ...joinTimestamp(shouldJoinTime, false) };
      } else {
        // 兼容restful风格
        config.url = `${config.url ?? ""}${params}${joinTimestamp(shouldJoinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        shouldFormatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data")
          && config.data
          && (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (shouldJoinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = `${config.url ?? ""}${params}`;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * A function that is called after a response is received. It can transform the response data as needed.
   * 在接收到响应后调用的函数。它可以根据需要转换响应数据。
   */
  afterResponse(response: AxiosResponse | AxiosResponse<RequestResult>, options: RequestOptions): any {
    if (options.shouldReturnNativeResponseHeaders) {
      return response;
    }
    if (!options.shouldTransformResponse) {
      return response.data;
    }
    const { data } = response;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error("The interface request failed, please try again later!");
    }
    // 这里逻辑可以根据项目进行修改
    // const { code, result, message } = data;
    // const hasSuccess =
    //   data && Reflect.has(data, 'code') && code === ResultConstants.SUCCESS
    //
    // if (hasSuccess) {
    //   if (message) {
    //   //
    //   }

    return data;
  },

  /**
   * A function that is called when an error occurs during the request. It can handle the error as needed.
   * 在请求期间发生错误时调用的函数。它可以根据需要处理错误。
   */
  onRequestError(error: Error, options: RequestOptions): any {
    return {
      error, options,
    };
  },

  /**
   * A function that is called before a request interceptors is executed. It can modify the request configuration as needed.
   * 在执行请求拦截器之前调用的函数，可以根据需要修改请求配置。
   */
  requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
    // 请求之前处理config
    if (options.requestOptions) {
    //
    }
    return config;
  },

  /**
   * A function that is called after a response interceptors is executed. It can transform the response data as needed.
   * 在执行响应拦截器之后调用的函数，可以根据需要转换响应数据。
   */
  responseInterceptors(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
    return response;
  },

  /**
   * A function that is called when an error occurs during the request interceptors. It can handle the error as needed.
   * 在执行请求拦截器时发生错误时调用的函数，可以根据需要处理错误。
   */
  requestInterceptorsError(error: Error): any {
    return error;
  },

  /**
   * A function that is called when an error occurs during the response interceptors. It can handle the error as needed.
   * 在执行响应拦截器时发生错误时调用的函数，可以根据需要处理错误。
   */
  responseInterceptorsError(error: Error, axiosInstance: AxiosInstance): any {
    return { error, instance: axiosInstance };
  },

};
