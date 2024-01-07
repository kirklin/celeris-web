import { withInstall } from "@celeris/utils/src/vue/install";
import unocssIcon from "./src/UnoCSSIcon.vue";
import icon from "./src/Icon.vue";

export const UnoCSSIcon = withInstall(unocssIcon);
export const Icon = withInstall(icon);

export { default as CAUnoCSSIcon } from "./src/UnoCSSIcon.vue";
export { default as CAIcon } from "./src/Icon.vue";
