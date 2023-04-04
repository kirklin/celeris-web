import { isObject } from "@vueuse/core";
import { cloneDeep, mergeWith, unionWith } from "lodash-es";
import { isArray, isEqual } from "./typeChecks";

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param shouldConcat A flag to indicate whether to concatenate arrays instead of union them. Default is false.
 *        一个标志用于指示是否在合并数组时使用concat()方法而不是并集操作。默认为false。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(source: T, target: U, shouldConcat = false): T & U {
  return mergeWith(cloneDeep(source), target, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        return isArray(prevValue)
          ? (shouldConcat
            // returns the concatenation result if isConcat is true, or the union with next value if shouldConcat is false.
            // 若shouldConcat为true，则返回合并后的结果，否则返回与下一个值的并集。
              ? prevValue.concat(nextValue)
              : unionWith(prevValue, nextValue, isEqual))
          : undefined;
      });
    }
  });
}
