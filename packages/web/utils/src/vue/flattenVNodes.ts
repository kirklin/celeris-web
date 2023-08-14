import {
  Comment,
  Fragment,
  type VNode,
  type VNodeChild,
  createTextVNode,
} from "vue";

/**
 * Flattens an array of VNode children.
 * 将 VNode 子数组展平。
 *
 * @param {VNodeChild[]} vNodes - The array of VNode children to flatten.
 *                               要展平的 VNode 子数组。
 * @param {boolean} filterCommentNode - Whether to filter out comment nodes. Default is true.
 *                                    是否过滤掉注释节点。默认为 true。
 * @param {VNode[]} result - The array to store the flattened VNodes.
 *                         用于存储展平后的 VNodes 的数组。
 * @returns {VNode[]} Returns an array of flattened VNodes.
 *                    返回展平后的 VNode 数组。
 */
export function flattenVNodes(
  vNodes: VNodeChild[],
  filterCommentNode = true,
  result: VNode[] = [],
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) {
      return;
    }
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flattenVNodes(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) {
        return;
      }
      if (Array.isArray(vNode.children)) {
        flattenVNodes(vNode.children, filterCommentNode, result);
      }
      // rawSlot
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
