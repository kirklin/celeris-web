/**
 * 打开一个新的浏览器窗口
 * Open a new browser window
 *
 * @param url 要在新窗口中打开的 URL
 * The URL to open in the new window
 *
 * @param options 打开窗口的选项
 * Options for opening the window
 *
 */
export function openWindow(url: string, { target = "_blank", features = "noopener=yes,noreferrer=yes" }: {
  target?: "_blank" | "_self" | "_parent" | "_top"; // 新窗口的名称或特殊选项，默认为 "_blank"
  features?: string; // 新窗口的特性（大小，位置等），默认为 "noopener=yes,noreferrer=yes"
} = {}) {
  window.open(url, target, features);
}
