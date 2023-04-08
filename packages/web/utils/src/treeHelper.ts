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
const DEFAULT_CONFIG: TreeHelperConfig = {
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
const getConfig = (config: Partial<TreeHelperConfig>): TreeHelperConfig => ({ ...DEFAULT_CONFIG, ...config });

/**
 * Convert a flat list to a tree structure.
 * 将列表转换为树形结构。
 * @param list Array<T> list
 * @param config Partial<TreeHelperConfig<T>> configuration options
 * @returns An array of type T[], where T extends TreeNode.
 */
export function flattenTreeToList<T>(list: T[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { idKey, childrenKey, parentKey } = getConfig(config);
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
 * @param tree The tree structure to be converted to a flat list.
 * @param config The configuration for TreeHelper.
 * @returns An array of type T[] containing the flattened nodes, where T extends TreeNode.
 */
export function treeToFlatList<T>(tree: T[], config: Partial<TreeHelperConfig> = {}): T[] {
  const { childrenKey } = getConfig(config);
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
