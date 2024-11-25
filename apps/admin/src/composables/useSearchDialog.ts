import { isWindows } from "@celeris/utils";
import { ref } from "vue";

const listener = ref();
export function useSearchDialog() {
  const commandIcon = ref(isWindows() ? "CTRL" : "⌘");
  return {
    commandIcon,
    trigger: (cb: () => void): void => {
      listener.value = cb;
    },
    open: (): void => {
      listener.value && listener.value();
    },
  };
}
