/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.ADMIN"
 */
import type { App, Directive, DirectiveBinding } from "vue";

function isAuth(el: Element, binding: any) {
  const { hasPermission } = useAppPermission();

  const value = binding.value;
  if (!value) {
    return;
  }
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

function mounted(el: Element, binding: DirectiveBinding<any>) {
  isAuth(el, binding);
}

const authDirective: Directive = {
  mounted,
};

export function setupPermissionDirective(app: App) {
  app.directive("auth", authDirective);
}

export default authDirective;
