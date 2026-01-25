import { TNode, WorkFlow } from "./types";
import { buildGraph } from "./utils";

export const topologicalSortBfs = (workflow: WorkFlow) => {
  const { adjacencyList, inDegrees, nodeMap } = buildGraph(workflow);
  const queue: TNode[] = [];
  const result: TNode[] = [];
  // https://stackoverflow.com/a/36392307/11720536
  // shallow clone
  const inDegreesClone = new Map(inDegrees);

  const enqueueZeroInDegreeNode = () => {
    // 入队所有入度为0的节点
    inDegreesClone.forEach((degree, id) => {
      if (degree === 0) {
        const node = nodeMap.get(id);
        if (node) {
          queue.push(node);
        }
      }
    });
  };
  enqueueZeroInDegreeNode();

  // 处理所有的邻接节点
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);
    const successors = adjacencyList.get(node.id);
    if (successors) {
      for (let i = 0; i < successors.length; i++) {
        const successor = successors[i];
        let inDegreeClone = inDegreesClone.get(successor.id)!;
        inDegreeClone--;
        inDegreesClone.set(successor.id, inDegreeClone);
        if (inDegreeClone === 0) {
          queue.push(successor);
        }
      }
    }
  }

  return result;
};
