import type { Component, ComponentInternalInstance, MaybeRef } from "vue";
import { defineComponent, getCurrentInstance, h } from "vue";

type VNode = ReturnType<typeof h>;

function createInnerComp(
  component: Component,
  instance: ComponentInternalInstance,
  ref: MaybeRef | null | undefined, // 添加 Ref 类型的 ref 参数
): VNode {
  const componentVNode: VNode = h(component, instance.vnode.props, instance.vnode.children as VNode[]);
  // ref forwarding
  if (ref) {
    componentVNode.ref = ref.value; // 确保使用了 ref.value
  }
  return componentVNode;
}

function forwardRefComponent(component: Component): Component {
  const higherOrderComponent = defineComponent({
    name: "forwardRefHOC",
    /* Placeholder for async loading */
    __asyncLoader: Promise.resolve(),
    setup() {
      const currentInstance: ComponentInternalInstance | null = getCurrentInstance();
      const ref = currentInstance?.vnode?.ref; // 获取 ref
      return () => {
        if (!currentInstance) {
          return null;
        }
        const vnode = createInnerComp(component, currentInstance, ref);
        return vnode;
      };
    },
  });
  return higherOrderComponent;
}

export { forwardRefComponent };
