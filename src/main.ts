import { useLocalStorage } from "@vueuse/core";
import { createApp } from "vue";
// Vue Router
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import * as Icons from "@element-plus/icons-vue";
import { router } from "./router";

import { registerStore } from "./store";
import App from "~/App.vue";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "~/styles/index.scss";
import "uno.css";
// Element icons

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>("./locales/*.json", { eager: true }))
    .map(([key, value]) => {
      return [key.slice(10, -5), value.default];
    }),
);
app.use(createI18n({
  legacy: false,
  locale: unref(useLocalStorage("locale", "zh-CN")),
  messages,
}));
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(createPinia());
registerStore();
app.use(router);
app.mount("#app");
