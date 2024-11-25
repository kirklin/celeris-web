import type { ComponentPublicInstance } from "vue";

export {
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBoolean,
  isBuffer,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFinite,
  isFunction,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNull,
  isNumber,
  isObject,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from "lodash-es";

/**
 * Checks if the code is running in a server-side rendering (SSR) environment.
 * 检查代码是否在服务器端渲染（SSR）环境中运行。
 *
 * @returns {boolean} Returns true if the code is running in a server-side rendering environment,
 *                    otherwise returns false.
 *                    如果代码在服务器端渲染环境中运行，则返回 true；否则返回 false。
 */
export const isServerRendering = (() => {
  try {
    return !(typeof window !== "undefined" && document !== undefined);
  } catch (e) {
    return true;
  }
})();

// Define a function isHttpUrl that takes a string argument path and returns true if it is a valid Http URL.
// 定义一个函数 isHttpUrl，它接受一个字符串参数 path，如果它是有效的Http URL，则返回 true。
export function isHttpUrl(path: string): boolean {
  try {
    const url = new URL(path);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}

export function isComponentInstance(value: any): value is ComponentPublicInstance {
  return value?.$ !== undefined;
}
