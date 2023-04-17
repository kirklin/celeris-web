/**
 * Defines different modes of permissions in a system.
 */
export enum PermissionModeConstants {
  /**
   * Role-based permissions.
   * 角色权限
   */
  ROLE = "ROLE",

  /**
   * Backend-based permissions.
   * 后端权限
   */
  BACKEND = "BACKEND",

  /**
   * Route mapping-based permissions.
   * 路由映射权限
   */
  ROUTE_MAPPING = "ROUTE_MAPPING",
}

/**
 * Defines Enum type for permission cache type
 * 定义权限缓存类型的枚举类型
 */
export enum PermissionCacheTypeConstants {
  /**
   * Local storage.
   * 本地存储
   */
  LOCAL_STORAGE = "LOCAL_STORAGE",

  /**
   * Session storage.
   * 会话存储
   */
  SESSION_STORAGE = "SESSION_STORAGE",
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
