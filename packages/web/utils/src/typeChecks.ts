export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isDate,
  isElement,
  isEmpty,
  isEqualWith,
  isError,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNull,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSet,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from "lodash-es";

export {
  isBoolean,
  isClient,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "@vueuse/core";

// Define a constant isServer that is true if the code is running on the server, and false otherwise.
// 定义一个常量 isServer，如果代码在服务器上运行，则为 true；否则为 false。
export const isServer = typeof window === "undefined";

// Define a function isUrl that takes a string argument path and returns true if it is a valid URL.
// 定义一个函数 isUrl，它接受一个字符串参数 path，如果它是有效的 URL，则返回 true。
export function isUrl(path: string): boolean {
  const regex = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
  return regex.test(path);
}
