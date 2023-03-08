import type { App } from "vue";
import copy from "./src/copy";
export const AllDirectives = {
  // Custom directives
  copy,
};

export default {
  install(app: App) {
    Object.keys(AllDirectives).forEach((key) => {
      app.directive(key, AllDirectives[key]);
    });
  },
};
