import { TNode, WorkFlow } from "./types";
import { buildGraph } from "./utils";

export const isCyclic = (workflow: WorkFlow) => {
  const { nodes } = workflow;
  const { adjacencyList } = buildGraph(workflow);
  const visited = new Map();
  const recursionStack = new Map();

  // 继续寻找节点的邻接节点是否有环
  const dfs = (node: TNode) => {
    if (recursionStack.has(node.id)) {
      return true;
    }
    if (visited.has(node.id)) {
      return false;
    }

    visited.set(node.id, node);
    recursionStack.set(node.id, node);
    const successors = adjacencyList.get(node.id);
    if (successors) {
      for (let i = 0; i < successors.length; i++) {
        const successor = successors[i];
        if (dfs(successor)) {
          return true;
        }
      }
    }
    // 完成当前节点
    recursionStack.delete(node.id);
    return false;
  };

  // 每个节点都要遍历，保证所有的连接都没有环：
  // 非连通图（思考俩个示例）
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!visited.has(node.id)) {
      if (dfs(node)) {
        return true;
      }
    }
  }

  return false;
};
