import { RequestConstants, ResultConstants } from "@celeris/constants";
import type { RequestOptions, RequestResult } from "@celeris/types/src/httpClient";
import { isEmpty, isString } from "@celeris/utils";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { HttpRequestConfiguration } from "../../../requestConfiguration";
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
    // Format date in request data if shouldFormatDate is true
    shouldFormatDate && data && !isString(data) && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestConstants.GET) {
      if (!isString(params)) {
        // Add timestamp parameter to GET requests to avoid caching
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = { ...params, ...joinTimestamp(shouldJoinTime, false) };
      } else {
        // Support REST style
        // 兼容restful风格
        config.url = `${config.url ?? ""}${params}${joinTimestamp(shouldJoinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        shouldFormatDate && formatRequestDate(params);
        // Append params and data to request configuration if they exist
        if (
          Reflect.has(config, "data")
          && config.data
          && (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // If data is not provided for non-GET requests, treat params as data
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }

        // Append params and data to url query parameters if shouldJoinParamsToUrl is true
        if (shouldJoinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // Support REST style
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
    const responseData = response.data;

    if (!responseData) {
      throw new Error("The interface request failed, please try again later!");
    }

    // Depending on the project, you may need to adjust the logic here
    // 根据项目的不同，您可能需要调整这里的逻辑
    const { code, data: _data, message } = responseData;
    const isSuccessful = responseData && Reflect.has(responseData, "code") && code === ResultConstants.SUCCESS;

    if (isSuccessful) {
      let successMessage = message;

      if (isEmpty(successMessage)) {
        successMessage = "Operation success";
      }
      HttpRequestConfiguration.successMessageHandler(successMessage, options.successMessageMode);
      return _data;
    }
    HttpRequestConfiguration.errorMessageHandler(message, options.errorMessageMode);
  },

  /**
   * A function that is called when an error occurs during the request. It can handle the error as needed.
   * 在请求期间发生错误时调用的函数。它可以根据需要处理错误。
   */
  onRequestError(error: Error, options: RequestOptions): any {
    return {
      error,
      options,
    };
  },

  /**
   * A function that is called before a request interceptors is executed. It can modify the request configuration as needed.
   * 在执行请求拦截器之前调用的函数，可以根据需要修改请求配置。
   */
  requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
    const token = HttpRequestConfiguration.getToken();
    if (token && options.requestOptions?.shouldSendTokenInHeader) {
      config.headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${<string>token}` : <string>token;
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
