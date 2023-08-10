import type { App } from "vue";
import copy from "./src/copy";
import ripple from "./src/ripple";

export const AllDirectives = {
  // Custom directives
  copy,
  ripple,
};

export function setupDirectives(app: App) {
  Object.keys(AllDirectives).forEach((key) => {
    app.directive(key, AllDirectives[key]);
  });
}
