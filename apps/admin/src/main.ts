import { createApp } from "vue";

import { setupDirectives } from "@celeris/directives";
import { setupI18n } from "@celeris/locale";
import { router, setupRouter } from "./router";
import { setupStore } from "./store";
import { setupPermissionDirective } from "~/directives/permission";
import { setupVueQuery } from "~/apis";
import { initializeConfiguration } from "~/AppConfiguration";
import { setupRouterGuard } from "~/router/guard";

import App from "~/App.vue";

import "@celeris/styles";

const app = createApp(App);

// Configure vue-query
// 配置 vue-query
setupVueQuery(app);

// Configure store
// 配置 store
setupStore(app);

// Configure routing
// 配置路由
setupRouter(app);

// Configure router guard
// 配置路由守卫
setupRouterGuard(router);

// Register global directive
// 注册全局指令
setupDirectives(app);
setupPermissionDirective(app);

void Promise.all([
  // Initialize internal system configuration
  // 初始化内部系统配置
  initializeConfiguration(),
  // Configure i18n
  // 配置国际化
  setupI18n(app),
]).finally(() => {
  app.mount("#app");
});
