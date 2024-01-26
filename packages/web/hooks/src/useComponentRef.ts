import { isComponentInstance } from "@celeris/utils";
import type { ComponentPublicInstance } from "vue";
import { onMounted, ref, watch } from "vue";

export function useComponentRef(name: string) {
  const componentRef = ref<HTMLElement | ComponentPublicInstance>();

  const getElement = () => {
    if (isComponentInstance(componentRef.value)) {
      return componentRef.value.$refs[name] as HTMLElement;
    }
    return componentRef.value;
  };

  const elementRef = ref();

  onMounted(() => {
    elementRef.value = getElement();
  });

  watch([componentRef], () => {
    elementRef.value = getElement();
  });

  return {
    componentRef,
    elementRef,
  };
}
