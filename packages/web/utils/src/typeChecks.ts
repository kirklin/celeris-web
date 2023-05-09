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

// Define a constant isServer that is true if the code is running on the server, and false otherwise.
// 定义一个常量 isServer，如果代码在服务器上运行，则为 true；否则为 false。
export const isServer = typeof window === "undefined";

// Define a constant isClient that is true if the code is running in the browser, and false otherwise.
// 定义一个常量 isClient，如果代码在浏览器中运行，则为 true；否则为 false。
export const isClient = !isServer;

// Define a function isHttpUrl that takes a string argument path and returns true if it is a valid Http URL.
// 定义一个函数 isHttpUrl，它接受一个字符串参数 path，如果它是有效的Http URL，则返回 true。
export function isHttpUrl(path: string): boolean {
  const regex = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
  return regex.test(path);
}
