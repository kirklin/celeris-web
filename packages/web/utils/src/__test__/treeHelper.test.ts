import { describe, expect, it } from "vitest";
import { findTreeNode, findTreeNodes, flattenToTree, flattenTree } from "../treeHelper";

describe("Tree Helper", () => {
  interface TreeNode {
    id: number;
    parentId: number | null;
    children?: TreeNode[];
  }

  const sampleTree: TreeNode[] = [
    {
      id: 1,
      parentId: null,
      children: [
        {
          id: 2,
          parentId: 1,
          children: [
            { id: 3, parentId: 2 },
            { id: 4, parentId: 2 },
          ],
        },
        {
          id: 5,
          parentId: 1,
          children: [
            { id: 6, parentId: 5 },
            { id: 7, parentId: 5 },
          ],
        },
      ],
    },
  ];

  describe("flattenToTree", () => {
    it("converts a flat list to a tree structure", () => {
      const flattenedNodes = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 2 },
        { id: 4, parentId: 2 },
        { id: 5, parentId: 1 },
        { id: 6, parentId: 5 },
        { id: 7, parentId: 5 },
      ];
      const expectedTree = [
        {
          id: 1,
          parentId: null,
          children: [
            {
              id: 2,
              parentId: 1,
              children: [
                { id: 3, parentId: 2, children: [] },
                { id: 4, parentId: 2, children: [] },
              ],
            },
            {
              id: 5,
              parentId: 1,
              children: [
                { id: 6, parentId: 5, children: [] },
                { id: 7, parentId: 5, children: [] },
              ],
            },
          ],
        },
      ];

      const actualTree = flattenToTree(flattenedNodes);

      expect(actualTree).toEqual(expectedTree);
    });
  });

  describe("flattenTree", () => {
    it("should flatten a tree correctly", () => {
      const tree = [
        {
          id: 1,
          name: "Node 1",
          children: [
            {
              id: 2,
              name: "Node 1.1",
              children: [
                { id: 3, name: "Node 1.1.1" },
                { id: 4, name: "Node 1.1.2" },
              ],
            },
            { id: 5, name: "Node 1.2" },
          ],
        },
        {
          id: 6,
          name: "Node 2",
          children: [
            { id: 7, name: "Node 2.1" },
          ],
        },
      ];

      const flattenedNodes = flattenTree(tree);

      expect(flattenedNodes).toEqual([
        {
          id: 1,
          name: "Node 1",
          children: [
            {
              id: 2,
              name: "Node 1.1",
              children: [
                { id: 3, name: "Node 1.1.1" },
                { id: 4, name: "Node 1.1.2" },
              ],
            },
            { id: 5, name: "Node 1.2" },
          ],
        },
        {
          id: 2,
          name: "Node 1.1",
          children: [
            { id: 3, name: "Node 1.1.1" },
            { id: 4, name: "Node 1.1.2" },
          ],
        },
        { id: 3, name: "Node 1.1.1" },
        { id: 4, name: "Node 1.1.2" },
        { id: 5, name: "Node 1.2" },
        {
          id: 6,
          name: "Node 2",
          children: [
            { id: 7, name: "Node 2.1" },
          ],
        },
        { id: 7, name: "Node 2.1" },
      ]);
    });

    it("should return an empty array when the input tree is empty", () => {
      const tree = [];
      const flattenedNodes = flattenTree(tree);
      expect(flattenedNodes).toEqual([]);
    });

    it("should handle a tree with a single node correctly", () => {
      const tree = [{ id: 1, name: "Node 1" }];
      const flattenedNodes = flattenTree(tree);
      expect(flattenedNodes).toEqual([{ id: 1, name: "Node 1" }]);
    });

    it("should handle a tree with no children correctly", () => {
      const tree = [
        { id: 1, name: "Node 1" },
        { id: 2, name: "Node 2" },
        { id: 3, name: "Node 3" },
      ];
      const flattenedNodes = flattenTree(tree);
      expect(flattenedNodes).toEqual([
        { id: 1, name: "Node 1" },
        { id: 2, name: "Node 2" },
        { id: 3, name: "Node 3" },
      ]);
    });
  });

  describe("findTreeNode", () => {
    it("finds the first node in the tree that satisfies the predicate", () => {
      const expectedNode = { id: 3, parentId: 2 };

      const actualNode = findTreeNode(sampleTree, node => node.id === 3);

      expect(actualNode).toEqual(expectedNode);
    });

    it("returns null if no node satisfies the predicate", () => {
      const actualNode = findTreeNode(sampleTree, node => node.id === 999);

      expect(actualNode).toBeNull();
    });
  });

  describe("findTreeNodes", () => {
    it("finds all nodes in the tree that satisfy the predicate", () => {
      const expectedNodes = [
        { id: 3, parentId: 2 },
        { id: 4, parentId: 2 },
      ];

      const actualNodes = findTreeNodes(sampleTree, node => node.parentId === 2);

      expect(actualNodes).toEqual(expectedNodes);
    });

    it("returns an empty array if no node satisfies the predicate", () => {
      const actualNodes = findTreeNodes(sampleTree, node => node.id === 999);

      expect(actualNodes).toEqual([]);
    });
  });
});
