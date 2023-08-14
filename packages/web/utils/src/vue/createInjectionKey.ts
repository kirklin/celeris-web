import type { InjectionKey } from "vue";

/**
 * Creates an injection key for use with the provide/inject API.
 * 创建一个用于 provide/inject API 的注入键。
 *
 * @template T - The type of value associated with the injection key.
 *               与注入键关联的值的类型。
 * @param {string} key - The unique identifier for the injection key.
 *                      用于标识注入键的唯一标识符。
 * @returns {InjectionKey<T>} Returns the injection key.
 *                          返回注入键。
 */
export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any;
}
