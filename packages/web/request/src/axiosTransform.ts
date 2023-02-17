/**
 * Data processing class, can be configured according to the project
 * 数据处理类，可以根据项目进行配置
 */
import type { RequestOptions, RequestResult } from "@celeris/types/src/httpClient";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * Options that can be passed to the `createAxios` function when creating a new Axios instance.
 * This extends the standard AxiosRequestConfig with additional options.
 * 创建 Axios 实例时可以传入的选项。这个接口扩展了标准的 AxiosRequestConfig。
 * 这个选项包括一些额外的配置项，可以用来自定义 Axios 的行为。
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {

  /**
   * Authentication scheme to be used, e.g., 'Bearer'.
   * 鉴权方案，例如 'Bearer'。
   */
  authenticationScheme?: string;

  /**
   * Request/response transformation function to be used.
   * 请求/响应转换函数。
   */
  transform?: AxiosTransform;

  /**
   * Request options to be passed to the transformation function.
   * 传递给转换函数的请求选项。
   */
  requestOptions?: RequestOptions;
}

/**
 * An abstract class that can be used to customize the behavior of the Axios HTTP client library.
 * 这是一个抽象类，可以用来自定义 Axios 的行为。
 */
export abstract class AxiosTransform {
  /**
   * A function that is called before a request is sent. It can modify the request configuration as needed.
   * 在发送请求之前调用的函数。它可以根据需要修改请求配置。
   */
  beforeRequest?(config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig;

  /**
   * A function that is called after a response is received. It can transform the response data as needed.
   * 在接收到响应后调用的函数。它可以根据需要转换响应数据。
   */
  afterResponse?(response: AxiosResponse | AxiosResponse<RequestResult>, options: RequestOptions): any;

  /**
   * A function that is called when an error occurs during the request. It can handle the error as needed.
   * 在请求期间发生错误时调用的函数。它可以根据需要处理错误。
   */
  onRequestError?(error: Error, options: RequestOptions): any;

  /**
   * A function that is called before a request interceptors is executed. It can modify the request configuration as needed.
   * 在执行请求拦截器之前调用的函数，可以根据需要修改请求配置。
   */
  requestInterceptors?(config: InternalAxiosRequestConfig, options: CreateAxiosOptions): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

  /**
   * A function that is called after a response interceptors is executed. It can transform the response data as needed.
   * 在执行响应拦截器之后调用的函数，可以根据需要转换响应数据。
   */
  responseInterceptors?(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;

  /**
   * A function that is called when an error occurs during the request interceptors. It can handle the error as needed.
   * 在执行请求拦截器时发生错误时调用的函数，可以根据需要处理错误。
   */
  requestInterceptorsError?(error: Error): any;

  /**
   * A function that is called when an error occurs during the response interceptors. It can handle the error as needed.
   * 在执行响应拦截器时发生错误时调用的函数，可以根据需要处理错误。
   */
  responseInterceptorsError?(error: Error, axiosInstance: AxiosInstance): any;
}
