import * as path from "node:path";
import process from "node:process";
import directoryTree from "directory-tree";
import treeify from "treeify";

const excludedDirectories = [/node_modules/, /\.git/, /\.vscode/, /\.idea/];
const rootDirectory = process.cwd();
const parentDirectory = path.dirname(rootDirectory);

const getFilteredChildren = (root, excludes) => {
  const filtered = directoryTree(root, { exclude: excludes });
  return filtered.children || [];
};

const buildTree = (children) => {
  return children.reduce((tree, child) => {
    const hasChildren = child.children?.length > 0;
    const formattedChild = hasChildren ? buildTree(child.children) : null;
    return { ...tree, [child.name]: formattedChild };
  }, {});
};

const formatTree = (object) => {
  return treeify.asTree(object, true, null);
};

const formattedTree = formatTree(buildTree(getFilteredChildren(parentDirectory, excludedDirectories)));

console.log(formattedTree);
