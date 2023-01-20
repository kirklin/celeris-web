import { useLocalStorage } from "@vueuse/core";
import { createApp } from "vue";
// Vue Router
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import index from "./router";

import { registerStore } from "./store";
import App from "~/App.vue";

// reset css
import "@kirklin/reset-css/kirklin.css";
import "~/styles/index.scss";
import "uno.css";

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
app.use(createPinia());
registerStore();
app.use(index);
app.mount("#app");
