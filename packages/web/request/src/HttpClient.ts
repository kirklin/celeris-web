import { ContentTypeConstants, RequestConstants } from "@celeris/constants";
import type { RequestOptions, RequestResult } from "@celeris/types/src/httpClient";
import { cloneDeep, deepMerge } from "@celeris/utils";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import qs from "qs";
import { AxiosCanceler } from "./axiosCancel";
import type { CreateAxiosOptions } from "./axiosTransform";

export class HttpClient {
  private instance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.instance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * 获取 Axios 实例
   */
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.instance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.instance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.instance) {
      return;
    }
    Object.assign(this.instance.defaults.headers, headers);
  }

  /**
   * 设置请求/响应拦截器
   */
  private setupInterceptors() {
    const { instance, options: { transform } } = this;
    if (!transform) {
      return;
    }

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited
        const { requestOptions } = this.options;
        const ignoreCancel = requestOptions?.shouldIgnoreAbortController ?? true;

        !ignoreCancel && axiosCanceler.addPending(config);

        if (transform.requestInterceptors) {
          return transform.requestInterceptors(config, this.options) || config;
        }
        return config;
      },
      (error: Error) => {
        if (transform.requestInterceptorsError) {
          return transform.requestInterceptorsError(error);
        }
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        response && axiosCanceler.removePending(response.config);
        if (transform.responseInterceptors) {
          return transform.responseInterceptors(response) || response;
        }
        return response;
      },
      (error: Error) => {
        if (transform.responseInterceptorsError) {
          return transform.responseInterceptorsError(error, this.instance);
        }
        return Promise.reject(error);
      },
    );
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig): AxiosRequestConfig {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeConstants.FORM_URLENCODED
      || !Reflect.has(config, "data")
      || config.method?.toUpperCase() === RequestConstants.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestConstants.GET }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestConstants.POST }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestConstants.PUT }, options);
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestConstants.DELETE }, options);
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform() || {};

    const { requestOptions } = this.options;

    const opt: RequestOptions = deepMerge(requestOptions, options || {});

    if (transform.beforeRequest) {
      conf = transform.beforeRequest(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<RequestResult>>(conf)
        .then((res: AxiosResponse<RequestResult>) => {
          if (transform.afterResponse) {
            try {
              const ret = transform.afterResponse(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((error: Error | AxiosError) => {
          if (transform.onRequestError) {
            reject(transform.onRequestError(error, opt));
            return;
          }
          if (axios.isAxiosError(error)) {
            // rewrite error message from axios in here
          }
          reject(error);
        });
    });
  }
}
