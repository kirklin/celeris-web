import { createApp } from "vue";

import { router } from "./router";

import { setupStore } from "./store";
import App from "~/App.vue";

import "@celeris/styles";

const app = createApp(App);

setupStore(app);

app.use(router);
app.mount("#app");
// When Closing mock, Tree Shaking `mockjs` dep
if (__VITE_USE_MOCK__) {
  void import("../mock/_mock-server").then(({ setupProdMockServer }) =>
    setupProdMockServer(),
  );
}
