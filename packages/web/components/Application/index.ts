import { withInstall } from "@celeris/utils/src/vue/install";
import appLogo from "./src/AppLogo.vue";
import appProvider from "./src/AppNaiveUIProvider.vue";

export const AppLogo = withInstall(appLogo);
export const AppNaiveUIProvider = withInstall(appProvider);

export { default as CAAppLogo } from "./src/AppLogo.vue";
export { default as CAAppNaiveUIProvider } from "./src/AppNaiveUIProvider.vue";
