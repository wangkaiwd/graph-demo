import { TNode, WorkFlow } from "./types";

export const buildGraph = (workflow: WorkFlow) => {
  const { nodes, edges } = workflow;
  const nodeMap = new Map<string, TNode>();
  const adjacencyList = new Map<string, TNode[]>();
  const inDegrees = new Map<string, number>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    inDegrees.set(node.id, 0);
  });

  edges.forEach((edge) => {
    const { source, target } = edge;
    const targetNode = nodeMap.get(target);
    if (!targetNode) {
      throw Error(`target not exist in edge:${JSON.stringify(edge)}`);
    }
    const adjacencyNodes = adjacencyList.get(source) || [];
    adjacencyNodes.push(targetNode);
    let inDegree = inDegrees.get(target)!;
    inDegree++;
    inDegrees.set(target, inDegree);
    adjacencyList.set(source, adjacencyNodes);
  });

  return {
    adjacencyList,
    inDegrees,
    nodeMap,
  };
};
