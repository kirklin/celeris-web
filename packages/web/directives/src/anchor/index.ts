import type { Directive, DirectiveBinding } from "vue";

const anchor: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener("click", () => {
      const target = document.querySelector(binding.value);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  },
};

export default anchor;
