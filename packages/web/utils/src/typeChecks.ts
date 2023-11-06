import type { ComponentPublicInstance } from "@vue/runtime-core";

export {
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFunction,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNumber,
  isNull,
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

/**
 * Checks if the code is running on the server-side (server) or client-side (browser) environment.
 * 检查代码是否在服务器端（服务器）或客户端（浏览器）环境中运行。
 *
 * The value of this constant will be true if the code is running on the server-side,
 * and false if it is running on the client-side.
 * 如果代码在服务器端运行，则此常量的值为 true；如果在客户端运行，则值为 false。
 *
 * @constant {boolean}
 */
export const isServer = typeof window === "undefined";

/**
 * Checks if the code is running on the client-side (browser) environment.
 * 检查代码是否在客户端（浏览器）环境中运行。
 *
 * The value of this constant will be true if the code is running on the client-side,
 * and false if it is running on the server-side.
 * 如果代码在客户端运行，则此常量的值为 true；如果在服务器端运行，则值为 false。
 *
 * @constant {boolean}
 */
export const isClient = !isServer;

// Define a function isHttpUrl that takes a string argument path and returns true if it is a valid Http URL.
// 定义一个函数 isHttpUrl，它接受一个字符串参数 path，如果它是有效的Http URL，则返回 true。
export function isHttpUrl(path: string): boolean {
  const regex = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
  return regex.test(path);
}

export function isComponentInstance(value: any): value is ComponentPublicInstance {
  return value?.$ !== undefined;
}
