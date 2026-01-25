import { TNode, WorkFlow } from "./types";
import { buildGraph } from "./utils";

/**
 * 排序后的节点，如果包含子工作流（循环节点），则该属性包含其内部的层级排序结果
 */
export type SortedNode = TNode & {
  sortedSubWorkflow?: SortedNode[][];
};

/**
 * 复杂拓扑排序：支持并行节点分组（分层）和循环节点处理（方案一：黑盒/子图递归排序）
 * 
 * TODO: 
 *  1. 梳理下如何处理子工作流
 * 
 * @param workflow 工作流对象
 * @returns 分层的排序结果，每一层为一个并行执行的节点数组
 */
export const complexTopologicalSort = (workflow: WorkFlow): SortedNode[][] => {
  const { adjacencyList, inDegrees, nodeMap } = buildGraph(workflow);
  const result: SortedNode[][] = [];
  const inDegreesClone = new Map(inDegrees);

  // 初始化：寻找所有初始入度为 0 的节点（即起点）
  let currentLayerIds: string[] = [];
  inDegreesClone.forEach((degree, id) => {
    if (degree === 0) {
      currentLayerIds.push(id);
    }
  });

  while (currentLayerIds.length > 0) {
    const layerNodes: SortedNode[] = [];
    const nextLayerIds: string[] = [];

    // 处理当前层级中的所有节点
    for (const nodeId of currentLayerIds) {
      const node = nodeMap.get(nodeId);
      if (!node) continue;

      const sortedNode: SortedNode = { ...node };

      // 方案一：黑盒化处理。如果该节点是循环节点（包含 subWorkflow），则递归进行排序
      if (node.subWorkflow) {
        sortedNode.sortedSubWorkflow = complexTopologicalSort(node.subWorkflow);
      }

      layerNodes.push(sortedNode);

      // 移除该节点对下游的影响，减少下游节点的入度
      const successors = adjacencyList.get(nodeId);
      if (successors) {
        for (const successor of successors) {
          const currentDegree = inDegreesClone.get(successor.id);
          if (currentDegree !== undefined) {
            const nextDegree = currentDegree - 1;
            inDegreesClone.set(successor.id, nextDegree);
            // 如果下游节点入度变为 0，则它属于下一波并行执行的节点
            if (nextDegree === 0) {
              nextLayerIds.push(successor.id);
            }
          }
        }
      }
    }

    // 将当前层级加入结果集
    result.push(layerNodes);
    // 进入下一个层级
    currentLayerIds = nextLayerIds;
  }

  // 环检测：如果排出的节点数少于输入总数，说明图中存在环
  const totalSortedNodes = result.reduce((sum, layer) => sum + layer.length, 0);
  if (totalSortedNodes < workflow.nodes.length) {
    throw new Error(
      "Cycle detected: Topological sort is only possible on DAGs."
    );
  }

  return result;
};
