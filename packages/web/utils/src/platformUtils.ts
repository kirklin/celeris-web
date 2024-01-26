import type { OS } from "@celeris/constants";
import { OperatingSystem } from "@celeris/constants";

/**
 * Retrieves the operating system (OS) of the current environment based on the user agent.
 * 基于用户代理检索当前环境的操作系统（OS）。
 *
 * @returns {OS} The operating system of the current environment.
 *               当前环境的操作系统。
 */
export function detectOperatingSystem(): OS {
  const { userAgent } = navigator;
  if (userAgent.includes("Win")) {
    return OperatingSystem.Windows;
  }
  if (userAgent.includes("Mac")) {
    return OperatingSystem.MacOS;
  }
  if (userAgent.includes("X11")) {
    return OperatingSystem.UNIX;
  }
  if (userAgent.includes("Linux")) {
    return OperatingSystem.Linux;
  }

  return OperatingSystem.Unknown;
}

/**
 * Checks if the current environment is Windows.
 * 检查当前环境是否为 Windows。
 *
 * @returns {boolean} Returns true if the current environment is Windows, otherwise returns false.
 *                    如果当前环境为 Windows，则返回 true；否则返回 false。
 */
export function isWindows(): boolean {
  return detectOperatingSystem() === OperatingSystem.Windows;
}

/**
 * Checks if the current environment is MacOS.
 * 检查当前环境是否为 MacOS。
 *
 * @returns {boolean} Returns true if the current environment is MacOS, otherwise returns false.
 *                    如果当前环境为 MacOS，则返回 true；否则返回 false。
 */
export function isMacOS(): boolean {
  return detectOperatingSystem() === OperatingSystem.MacOS;
}

/**
 * Checks if the current environment is UNIX-based.
 * 检查当前环境是否为基于 UNIX 的系统。
 *
 * @returns {boolean} Returns true if the current environment is UNIX-based, otherwise returns false.
 *                    如果当前环境为基于 UNIX 的系统，则返回 true；否则返回 false。
 */
export function isUnix(): boolean {
  return detectOperatingSystem() === OperatingSystem.UNIX;
}

/**
 * Checks if the current environment is Linux.
 * 检查当前环境是否为 Linux。
 *
 * @returns {boolean} Returns true if the current environment is Linux, otherwise returns false.
 *                    如果当前环境为 Linux，则返回 true；否则返回 false。
 */
export function isLinux(): boolean {
  return detectOperatingSystem() === OperatingSystem.Linux;
}
