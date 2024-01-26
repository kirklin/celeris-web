import { intersectionWith, mergeWith, unionWith } from "lodash-es";
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
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case "union":
          return unionWith(sourceValue, targetValue, isEqual);
        case "intersection":
          return intersectionWith(sourceValue, targetValue, isEqual);
        case "concat":
          return sourceValue.concat(targetValue);
        case "replace":
          return targetValue;
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`);
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}

/**
 * 创建一个记忆化函数，用于缓存函数的计算结果，避免重复计算。
 * Create a memoized function to cache the computed result and avoid redundant calculations.
 *
 * @param getDependencies 一个返回依赖参数数组的函数。
 *                A function that returns an array of dependency parameters.
 * @param fn 计算函数，接受依赖参数并返回计算结果。
 *           The computation function that takes dependency parameters and returns the computed result.
 * @param options 配置选项对象，包含 key、debug 和 onChange 属性。
 *             Configuration options object that includes key, debug, and onChange properties.
 * @param options.key 用于标识缓存的唯一键。
 *          A key used to identify the unique cache.
 * @param options.debug 一个可选的调试函数，在每次计算时执行以提供调试信息。
 *            An optional debug function that executes during each computation to provide debugging information.
 * @param options.onChange 一个可选的回调函数，在计算结果发生变化时执行。
 *               An optional callback function that executes when the computed result changes.
 * @returns 返回一个函数，用于执行记忆化函数的计算逻辑，并返回计算结果。
 *          Returns a function that executes the computation logic of the memoized function and returns the computed result.
 */
export function memo<TDeps extends readonly any[], TResult>(
  getDependencies: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  options: {
    key: any;
    debug?: () => any;
    onChange?: (result: TResult) => void;
  },
): () => TResult {
  // 存储依赖参数和计算结果
  // Store the dependency parameters and the computed result
  let dependencies: any[] = [];
  let result: TResult | undefined;

  return () => {
    let dependencyStartTime: number;
    if (options.key && options.debug) {
      dependencyStartTime = Date.now();
    }

    // 获取最新的依赖参数数组
    // Get the latest array of dependency parameters
    const newDependencies = getDependencies();

    // 检查依赖参数是否发生变化
    // Check if the dependency parameters have changed
    const dependenciesChanged
      = newDependencies.length !== dependencies.length
      || newDependencies.some((dep: any, index: number) => dependencies[index] !== dep);

    if (!dependenciesChanged) {
      return result!;
    }

    dependencies = newDependencies;

    let computationStartTime: number;
    if (options.key && options.debug) {
      computationStartTime = Date.now();
    }

    // 执行计算函数，并缓存计算结果
    // Execute the computation function and cache the computed result
    result = fn(...newDependencies);

    // 执行 onChange 回调函数，传递计算结果
    // Execute the onChange callback function with the computed result
    options?.onChange?.(result);

    if (options.key && options.debug) {
      if (options?.debug()) {
        const dependencyEndTime = Math.round((Date.now() - dependencyStartTime!) * 100) / 100;
        const computationEndTime = Math.round((Date.now() - computationStartTime!) * 100) / 100;
        const computationFpsPercentage = computationEndTime / 16;

        const pad = (str: number | string, num: number) => {
          str = String(str);
          while (str.length < num) {
            str = ` ${str}`;
          }
          return str;
        };

        // eslint-disable-next-line no-console
        console.info(
          `%c⏱ ${pad(computationEndTime, 5)} /${pad(dependencyEndTime, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
            0,
            Math.min(120 - 120 * computationFpsPercentage, 120),
          )}deg 100% 31%);`,
          options?.key,
        );
      }
    }

    return result;
  };
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
export function getErrorMessage(error: Error | { message: string } | string): string {
  if (error instanceof Error) {
    return error.message;
  } else if (isObject(error) && "message" in error) {
    return error.message;
  } else {
    return String(error);
  }
}

// A constant function that does nothing and returns undefined
// 一个什么都不做并返回 undefined 的常量函数
export function NOOP(): undefined {
  return void 0;
}
