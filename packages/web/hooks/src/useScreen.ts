import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

// 使用 VueUse library 中的 useBreakpoints 函数创建响应式的断点对象
// Create a responsive breakpoint object using the useBreakpoints function from the VueUse library.
export const breakpoints = useBreakpoints(breakpointsTailwind);

// 检查当前屏幕宽度是否在 "sm" 和 "xl" 断点之间
// Check if the current screen width is between the "sm" and "xl" breakpoints.
export const isMediumOrLargeScreen = breakpoints.between("sm", "xl");

// 检查当前屏幕宽度是否小于或等于 "xl" 断点
// Check if the current screen width is smaller than or equal to the "xl" breakpoint.
export const isExtraLargeScreen = breakpoints.smallerOrEqual("xl");
