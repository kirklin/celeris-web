import { createApp } from "vue";

import { router } from "./router";

import { setupStore } from "./store";
import App from "~/App.vue";

import "@celeris/styles"

const app = createApp(App);

setupStore(app);

app.use(router);
app.mount("#app");
