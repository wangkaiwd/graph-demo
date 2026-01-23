import { TNode, WorkFlow } from "./types";

export const createAdjacencyList = (workflow: WorkFlow) => {
  const { nodes, edges } = workflow;
  const nodeMap = new Map<string, TNode>();
  const adjacencyList = new Map<string, TNode[]>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
  });

  edges.forEach((edge) => {
    const { source, target } = edge;
    const targetNode = nodeMap.get(target);
    const adjacencyNodes = adjacencyList.get(source) || [];
    adjacencyNodes.push(targetNode!);
    adjacencyList.set(source, adjacencyNodes);
  });

  return adjacencyList;
};
