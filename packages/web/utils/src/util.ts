import { cloneDeep, intersectionWith, mergeWith, unionWith } from "lodash-es";
import { isArray, isEqual, isObject } from "./typeChecks";

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: "union" | "intersection" | "concat" | "replace" = "replace",
): T & U {
  // Define a function for merging arrays.
  const mergeArraysFn = (prevValue: any[], nextValue: any[]) => {
    switch (mergeArrays) {
      case "intersection":
        return intersectionWith(prevValue, nextValue, isEqual);
      case "concat":
        return prevValue.concat(nextValue);
      case "union":
        return unionWith(prevValue, nextValue, isEqual);
      case "replace":
        return nextValue;
      default:
        return nextValue;
    }
  };

  return mergeWith(cloneDeep(source), target, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        // If both values are arrays, merge them using mergeArraysFn function.
        // 如果两个值都是数组，用mergeArraysFn函数将它们合并。
        return isArray(prevValue) ? mergeArraysFn(prevValue, nextValue) : undefined;
      });
    }
  });
}

/**
 * Get error message from an error object. If the error object is not an instance of Error,
 * it will be converted to string and returned.
 * 从错误对象中获取错误信息。如果错误对象不是 Error 的实例，
 * 则会将其转换为字符串并返回。
 *
 * @param error The error object to extract error message from. 用于提取错误信息的错误对象。
 * @returns The error message string. 错误信息字符串。
 */
export function getErrorMessage(error): string {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}
