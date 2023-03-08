import { isObject } from "@vueuse/core";
import { cloneDeep, isArray, mergeWith } from "lodash-es";

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(source: T, target: U): T & U {
  return mergeWith(cloneDeep(source), target, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        return isArray(prevValue) ? prevValue.concat(nextValue) : undefined;
      });
    }
  });
}
