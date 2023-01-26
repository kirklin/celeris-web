import { isObject } from "@vueuse/core";
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = { ...src };
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key]);
  }
  return res;
}
