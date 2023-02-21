/**
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
  FADE_SIDE = "fade-slide",

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
