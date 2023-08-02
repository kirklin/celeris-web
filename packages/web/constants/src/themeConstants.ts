/**
 * 定义系统中在切换不同路由时使用的不同类型的动画过渡效果。
 * Defines different types of animation transitions used when switching between different routes in a system.
 */
export enum RouterTransitionConstants {
  /**
   * A transition that zooms in and fades out the previous route, then zooms out and fades in the new route.
   */
  ZOOM_FADE = "zoom-fade",

  /**
   * A transition that zooms out and fades out the previous route, then fades in the new route.
   */
  ZOOM_OUT = "zoom-out",

  /**
   * A transition that fades out the previous route to the side, then fades in the new route from the opposite side.
   */
  FADE_SLIDE = "fade-slide",

  /**
   * A simple fade transition.
   */
  FADE = "fade",

  /**
   * A transition that fades out the previous route to the bottom, then fades in the new route from the bottom.
   */
  FADE_BOTTOM = "fade-bottom",

  /**
   * A transition that scales down and fades out the previous route, then scales up and fades in the new route.
   */
  FADE_SCALE = "fade-scale",
}

// 配置按钮显示位置的枚举类型
// Enum type for configuration button display position
export enum SettingButtonPositionConstants {
  // 自动根据菜单类型调整
  // Automatically adjust according to menu type
  AUTO = "auto",

  // 在顶部菜单栏显示
  // Display in the top menu bar
  HEADER = "header",

  // 固定在右下角显示
  // Fixed display in the lower right corner
  FIXED = "fixed",
}
