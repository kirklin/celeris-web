import type { Directive, DirectiveBinding } from "vue";
import { copyToClipboard, logger } from "@celeris/utils";

interface CopyDirectiveElement extends HTMLElement {
  copyData: string;
  __handleClick__: any;
}

/**
 * Define a custom directive to copy text to clipboard when clicking an element
 * 定义一个自定义指令，用于在点击一个元素时将文本复制到剪贴板
 */
const copy: Directive = {
  mounted(el: CopyDirectiveElement, binding: DirectiveBinding) {
    el.copyData = binding.value as string;
    const handleClick = () => {
      if (!el.copyData) {
        logger.warn("There is no content to copy.");
        return;
      }
      copyToClipboard(el.copyData);
    };
    el.addEventListener("click", handleClick);

    el.__handleClick__ = handleClick;
  },
  updated(el: CopyDirectiveElement, binding: DirectiveBinding) {
    el.copyData = binding.value as string;
  },
  beforeUnmount(el: CopyDirectiveElement) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default copy;
