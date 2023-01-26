import { createApp } from "vue";

import * as Icons from "@element-plus/icons-vue";
import { router } from "./router";

import { setupStore } from "./store";
import App from "~/App.vue";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "@celeris/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

setupStore(app);

app.use(router);
app.mount("#app");
