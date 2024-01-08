import type { Component } from "vue";
import { h } from "vue";
import { isNil } from "@celeris/utils";
import { Icon } from "../index";

/**
 * Normalizes the icon name by removing the prefix 'i-' if present.
 * 如果存在，通过删除前缀 'i-' 来规范化图标名称。
 *
 * @param {string} icon - The icon name to normalize.
 *                        需要规范化的图标名称。
 * @returns {string} Returns the normalized icon name.
 *                   返回规范化后的图标名称。
 */
export function normalizeIconName(icon: string): string {
  if (icon.startsWith("i-")) {
    icon = icon.replace(/^i-/, "");
  }
  return icon;
}

/**
 * Renders an icon component based on the provided icon name or component.
 * 根据提供的图标名称或组件，渲染一个图标组件。
 *
 * @param {Component | string} icon - The icon name or component to render.
 *                                    要渲染的图标名称或组件。
 * @returns {Function | void} Returns a function that renders the icon component if the icon is valid; otherwise, returns void.
 *                            如果图标有效，则返回一个渲染图标组件的函数；否则返回 void。
 */
export function renderIcon(icon: Component | string) {
  if (isNil(icon)) {
    return;
  }
  if (typeof icon === "string") {
    return () => h(Icon, { name: normalizeIconName(icon) });
  } else {
    return () => h(Icon, null, { default: () => h(icon) });
  }
}
