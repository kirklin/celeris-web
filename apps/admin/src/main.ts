import { createApp } from "vue";

import { setupDirectives } from "@celeris/directives";
import { setupRouter } from "./router";
import { setupStore } from "./store";

import App from "~/App.vue";

import "@celeris/styles";

const app = createApp(App);

// Configure store
// 配置 store
setupStore(app);

// Configure routing
// 配置路由
setupRouter(app);

// Register global directive
// 注册全局指令
setupDirectives(app);

app.mount("#app");

// When Closing mock, Tree Shaking `mockjs` dep
if (__VITE_USE_MOCK__) {
  void import("../mock/_mock-server").then(({ setupProdMockServer }) =>
    setupProdMockServer(),
  );
}
