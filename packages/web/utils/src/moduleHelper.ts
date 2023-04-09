import { isArray } from "./typeChecks";

/**
 * 从模块对象中加载数据并合并到一个数组中
 * Load data from modules and merge them into an array
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的数据数组 Loaded data array
 */
export function loadDataFromModules<T>(modules: Record<string, any>): T[] {
// 创建一个空数组用于存储数据 Create an empty array to store data
  const dataList: T[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    // 如果当前模块的默认导出是一个数组，则将其展开并添加到数据数组中，否则直接将其添加到数组中
    // If the default export of the current module is an array, expand it and add it to the data array; otherwise, add it directly to the array
    const modList = isArray(mod) ? [...mod] : [mod];
    dataList.push(...modList);
  });
  // 返回数据数组 Return the data array
  return dataList;
}
