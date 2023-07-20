import pick from "lodash/pick";

/**
 * Utility function to determine the raw type of a value.
 * 判断一个值的原始类型的实用函数。
 * @param val - The value to determine the raw type of. 要判断原始类型的值。
 * @returns The raw type of the value. 值的原始类型。
 */
const toRawType = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1);
/**
 * Utility function to check if a value is a valid PropertyKey (String, Number, or Symbol).
 * 判断一个值是否为有效的 PropertyKey（字符串、数字或符号）的实用函数。
 * @param val - The value to check. 要检查的值。
 * @returns true if the value is a PropertyKey, false otherwise. 如果值是 PropertyKey，则返回 true，否则返回 false。
 */
const isPropertyKey = (val: unknown): val is PropertyKey => ["String", "Number", "Symbol"].includes(toRawType(val));
/**
 * Type alias to extract valid keys from an object.
 * 从对象中提取有效键的类型别名。
 */
type ValidKeys<T, K extends keyof T = keyof T> = K extends K ? T[K] extends PropertyKey ? K : never : never;
/**
 * Overload 1:
 * Extracts the values of a specific key from an array of objects.
 * 从对象数组中提取指定键的值。
 * @param items - The array of objects. 对象数组。
 * @param key - The key to extract from each object. 从每个对象中提取的键。
 * @returns An array containing the extracted values. 包含提取值的数组。
 */
export function defineConstants<T extends object, K extends keyof T>(items: T[], key: K): T[K][];
/**
 * Overload 2:
 * Extracts specific values of a specific key from an array of objects and maps them to a new object.
 * 从对象数组中提取指定键的特定值，并将它们映射到一个新对象中。
 * @param items - The array of objects. 对象数组。
 * @param key - The key to extract from each object. 从每个对象中提取的键。
 * @param values - The values to extract from each object. 从每个对象中提取的值。
 * @returns An object containing the extracted keys and their corresponding values. 包含提取的键和相应值的对象。
 */
export function defineConstants<T extends object, K extends ValidKeys<T>, V extends keyof T>(items: T[], key: K, values: V): Record<T[K] extends PropertyKey ? T[K] : never, T[V]>;
/**
 * Overload 3:
 * Extracts multiple values of a specific key from an array of objects and maps them to a new object.
 * 从对象数组中提取指定键的多个值，并将它们映射到一个新对象中。
 * @param items - The array of objects. 对象数组。
 * @param key - The key to extract from each object. 从每个对象中提取的键。
 * @param values - The values to extract from each object. 从每个对象中提取的值。
 * @returns An object containing the extracted keys and their corresponding values. 包含提取的键和相应值的对象。
 */
export function defineConstants<T extends object, K extends ValidKeys<T>, V extends keyof T>(items: T[], key: K, values: V[]): Record<T[K] extends PropertyKey ? T[K] : never, Pick<T, V>>;

/**
 * A utility function to define constants based on an array of objects.
 * 根据对象数组定义常量的实用函数。
 * @param items - The array of objects. 对象数组。
 * @param key - The key to extract from each object. 从每个对象中提取的键。
 * @param values - The values to extract from each object. 从每个对象中提取的值。
 * @returns An array or object containing the extracted values. 包含提取值的数组或对象。
 */
export function defineConstants<T extends object, K extends keyof T, V extends keyof T>(items: T[], key: K, values?: V | V[]) {
  if (typeof values === "undefined") {
    return items.map(item => item[key]);
  }

  return items.reduce((map, item) => {
    const _key = item[key];
    if (!isPropertyKey(_key)) {
      return map;
    }

    const _val = Array.isArray(values) ? pick(item, values) : item[values];

    return { ...map, [_key]: _val };
  }, {});
}
