import { createApp } from "vue";

import { setupDirectives } from "@celeris/directives";
import { router, setupRouter } from "./router";
import { setupStore } from "./store";
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

initializeConfiguration();
app.mount("#app");
