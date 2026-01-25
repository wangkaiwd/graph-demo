import { expect } from "vitest";
import { TNode, WorkFlow } from "../types";

export const validateTopologicalSort = (
  result: TNode[],
  workflow: WorkFlow
) => {
  // 根据拓扑排序的结果是不确定的，只能通过它的定义进行测试：
  // 对于每一条有向边 (u,v)，u 在结果序列中必须出现在 v 之前
  const { edges } = workflow;
  const nodeMap = new Map<string, TNode & { index: number }>();

  result.forEach((item, i) => {
    nodeMap.set(item.id, {
      ...item,
      index: i,
    });
  });

  edges.forEach((edge) => {
    const { source, target } = edge;
    const sourceNode = nodeMap.get(source)!;
    const targetNode = nodeMap.get(target)!;
    expect(targetNode.index).toBeGreaterThan(sourceNode.index);
  });
};
