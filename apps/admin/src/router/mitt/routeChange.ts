/**
 * 用于监听路由变化，改变菜单和标签页的状态。不需要监控路由，因为路由状态变化受页面渲染时间影响，会有延迟
 */

import { getRawRoute, mitt } from "@celeris/utils";
import type { RouteLocationNormalized } from "vue-router";

const emitter = mitt();

const key = Symbol("route change event");

// 用于保存最近一次切换的标签页
let lastTab: RouteLocationNormalized;

// 设置路由变化
export function notifyRouteChange(newRoute: RouteLocationNormalized) {
  // 获取原始路由
  const rawRoute = getRawRoute(newRoute);
  // 触发事件
  emitter.emit(key, rawRoute);
  // 更新最近一次切换的标签页
  lastTab = rawRoute;
}

// 监听路由变化
export function listenToRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  // 注册回调函数
  emitter.on(key, callback);
  // 如果立即执行，则调用回调函数并传入最近一次切换的标签页
  immediate && lastTab && callback(lastTab);
}

// 移除监听器
export function removeRouteChangeListener() {
  emitter.clear();
}
