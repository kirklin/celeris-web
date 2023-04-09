/**
 * TreeHelperConfig interface defines the configuration for tree structure.
 * TreeHelperConfig 接口定义了树形结构的配置项。
 * @property idKey 节点标识符属性名，默认值为 "id"
 * @property childrenKey 子节点属性名，默认值为 "children"
 * @property parentKey 父节点标识符属性名，默认值为 "parentId"
 */
interface TreeHelperConfig<T = any> {
  idKey: keyof T;
  childrenKey: keyof T;
  parentKey: keyof T;
}

/**
 * 默认配置
 */
const DEFAULT_TREE_HELPER_CONFIG: TreeHelperConfig = {
  idKey: "id",
  childrenKey: "children",
  parentKey: "parentId",
};

/**
 * Get the TreeHelper configuration.
 * 获取 TreeHelper 配置。
 * @param config TreeHelperConfig configuration options 配置项
 * @returns TreeHelperConfig configuration
 */
const getTreeHelperConfig = (config: Partial<TreeHelperConfig>): TreeHelperConfig => ({ ...DEFAULT_TREE_HELPER_CONFIG, ...config });

/**
 * Convert a flat list to a tree structure.
 * 将列表转换为树形结构。
 * @param list Array<T> list to be converted to a tree structure. 要转换为树形结构的列表。
 * @param config Partial<TreeHelperConfig<T>> configuration options for TreeHelper. TreeHelper 的配置项。
 * @returns An array of type T[], where T extends TreeNode. 返回树形结构，其中 T 继承自 TreeNode。
 */
export function flattenToTree<T>(list: T[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { idKey, childrenKey, parentKey } = getTreeHelperConfig(config);
  const nodeMap = new Map<T[keyof T], any>();
  const tree: T[] = [];

  // create node map
  for (const node of list) {
    const childrenNodes: T[] = node[childrenKey] || [];
    nodeMap.set(node[idKey], { ...node, [childrenKey]: childrenNodes });
  }

  // construct tree
  for (const node of nodeMap.values()) {
    const parent = nodeMap.get(node[parentKey]);
    if (parent) {
      parent[childrenKey].push(node);
    } else {
      tree.push(node);
    }
  }

  return tree;
}

/**
 * Convert a tree structure to a flat list.
 * 将树形结构转换为扁平列表。
 * @param tree The tree structure to be converted to a flat list. 要转换为扁平列表的树形结构。
 * @param config The configuration for TreeHelper. 树形结构的配置项。
 * @returns An array of type T[] containing the flattened nodes, where T extends TreeNode. 返回扁平化的节点列表，其中 T 继承自 TreeNode。
 */
export function flattenTree<T>(tree: T[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { childrenKey } = getTreeHelperConfig(config);
  const flattenedNodes: T[] = [];

  function dfs(node: T) {
    flattenedNodes.push(node);
    const children = node[childrenKey];
    if (children) {
      for (const child of children) {
        dfs(child);
      }
    }
  }

  for (const node of tree) {
    dfs(node);
  }
  return flattenedNodes;
}

/**
 * Find the first node in the tree that satisfies the predicate.
 * 在树形结构中查找符合条件的第一个节点。
 * @param treeData The root nodes of the tree. 树形结构的根节点列表。
 * @param predicate The predicate function to test each node. 每个节点都会执行该回调函数。
 * @param config The configuration for TreeHelper. 树形结构的配置项。
 * @returns The first node in the tree that satisfies the predicate. 符合条件的第一个节点。
 */
export function findTreeNode<T>(
  treeData: T[],
  predicate: (node: T) => boolean,
  config: Partial<TreeHelperConfig> = {},
): T | null {
  const { childrenKey } = getTreeHelperConfig(config);
  for (const node of treeData) {
    if (predicate(node)) {
      return node;
    }

    const children = node[childrenKey];
    if (children) {
      const foundNode = findTreeNode(children, predicate, config);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
}

/**
 * Find all nodes in the tree that satisfy the predicate.
 * 在树形结构中查找符合条件的所有节点。
 * @param treeData The root nodes of the tree. 树形结构的根节点列表。
 * @param predicate The predicate function to test each node. 每个节点都会执行该回调函数。
 * @param config The configuration for TreeHelper. 树形结构的配置项。
 * @returns An array of nodes that satisfy the predicate. 符合条件的节点组成的数组。
 */
export function findTreeNodes<T>(
  treeData: T[],
  predicate: (node: T) => boolean,
  config: Partial<TreeHelperConfig> = {},
): T[] {
  const { childrenKey } = getTreeHelperConfig(config);
  const result: T[] = [];

  for (const node of treeData) {
    if (predicate(node)) {
      result.push(node);
    }

    const children = node[childrenKey];
    if (children) {
      const foundNodes = findTreeNodes(children, predicate, config);
      result.push(...foundNodes);
    }
  }

  return result;
}
