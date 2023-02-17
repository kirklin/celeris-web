import { deepMerge } from "@celeris/utils";
import type { CreateAxiosOptions } from "./axiosTransform";
import { HttpClient } from "./HttpClient";
import { defaultAxiosOptions } from "./options/defaultOptions";

export function createHttpClient(opt?: Partial<CreateAxiosOptions>) {
  return new HttpClient(
    deepMerge(
      defaultAxiosOptions,
      opt || {},
    ),
  );
}
export const defaultHttpClient = createHttpClient();
