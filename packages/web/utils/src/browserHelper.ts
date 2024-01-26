import { field, logger } from "../index";

/**
 * 打开一个新的浏览器窗口
 * Open a new browser window
 *
 * @param {string} url - 要在新窗口中打开的 URL
 * The URL to open in the new window
 *
 * @param {object} options - 打开窗口的选项
 * Options for opening the window
 * @param {string} options.target - 新窗口的名称或特殊选项，默认为 "_blank"
 * @param {string} options.features - 新窗口的特性（大小，位置等），默认为 "noopener=yes,noreferrer=yes"
 */
export function openWindow(url: string, { target = "_blank", features = "noopener=yes,noreferrer=yes" }: {
  target?: "_blank" | "_self" | "_parent" | "_top"; // 新窗口的名称或特殊选项，默认为 "_blank"
  features?: string; // 新窗口的特性（大小，位置等），默认为 "noopener=yes,noreferrer=yes"
} = {}) {
  window.open(url, target, features);
}

// copy text to clipboard
// 将文本复制到剪贴板
export function copyToClipboard(text: string) {
  // Try to use the navigator.clipboard.writeText method
  // 尝试使用navigator.clipboard.writeText方法
  void navigator.clipboard.writeText(text).then(() => {
    // Log the success message with the copied content
    // 记录成功信息和复制的内容
    logger.info("Copy Success", field("Content:", text));
  }).catch((error) => {
    // If there is an error, use the document.execCommand method as a fallback
    // 如果有错误，使用document.execCommand方法作为备选方案
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (!result) {
      logger.error("Copy Failed", field("Content:", text), field("Error:", error));
    } else {
      logger.info("Copy Success", field("Content:", text));
    }
  });
}
