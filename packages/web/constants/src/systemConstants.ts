/**
 * Defines different modes of permissions in a system.
 */
export enum PermissionModeConstants {
  /**
   * Role-based permissions.
   */
  ROLE = "ROLE",

  /**
   * Backend-based permissions.
   */
  BACKEND = "BACKEND",

  /**
   * Route mapping-based permissions.
   */
  ROUTE_MAPPING = "ROUTE_MAPPING",
}

// 会话超时处理方式的枚举类型
// Enum type for session timeout processing method
export enum SessionTimeoutProcessingConstants {
  // 路由跳转
  // Route jump
  ROUTE_JUMP,

  // 页面覆盖
  // Page coverage
  PAGE_COVERAGE,
}
