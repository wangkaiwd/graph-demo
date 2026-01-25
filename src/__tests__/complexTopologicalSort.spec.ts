import { describe, expect, it } from "vitest";
import { complexTopologicalSort } from "../complexTopologicalSort";
import { WorkFlow } from "../types";

describe("complexTopologicalSort", () => {
  it("应该能够处理并行节点（分层）", () => {
    /**
     * 图示：
     *     /-- B --\
     * A --         -- D
     *     \-- C --/
     */
    const workflow: WorkFlow = {
      nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }],
      edges: [
        { source: "A", target: "B" },
        { source: "A", target: "C" },
        { source: "B", target: "D" },
        { source: "C", target: "D" },
      ],
    };

    const result = complexTopologicalSort(workflow);

    // 应该分为 3 层：[A] -> [B, C] -> [D]
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual([{ id: "A" }]);

    // B 和 C 在同一层，顺序可能不固定，但必须都在这一层
    const layer1Ids = result[1].map((n) => n.id).sort();
    expect(layer1Ids).toEqual(["B", "C"]);

    expect(result[2]).toEqual([{ id: "D" }]);
  });

  it("应该支持循环节点（包含子工作流）且递归排序", () => {
    /**
     * 主流程：Start -> LoopNode -> End
     * 循环节点内部：Sub1 -> Sub2
     */
    const subWorkflow: WorkFlow = {
      nodes: [{ id: "Sub1" }, { id: "Sub2" }],
      edges: [{ source: "Sub1", target: "Sub2" }],
    };

    const workflow: WorkFlow = {
      nodes: [{ id: "Start" }, { id: "LoopNode", subWorkflow }, { id: "End" }],
      edges: [
        { source: "Start", target: "LoopNode" },
        { source: "LoopNode", target: "End" },
      ],
    };

    const result = complexTopologicalSort(workflow);

    expect(result).toHaveLength(3);

    // 第一层：Start
    expect(result[0][0].id).toBe("Start");

    // 第二层：LoopNode
    const loopNode = result[1][0];
    expect(loopNode.id).toBe("LoopNode");

    // 检查递归排序结果
    expect(loopNode.sortedSubWorkflow).toBeDefined();
    expect(loopNode.sortedSubWorkflow).toHaveLength(2);
    expect(loopNode.sortedSubWorkflow![0][0].id).toBe("Sub1");
    expect(loopNode.sortedSubWorkflow![1][0].id).toBe("Sub2");

    // 第三层：End
    expect(result[2][0].id).toBe("End");
  });

  it("当检测到环时应该抛出错误", () => {
    const workflow: WorkFlow = {
      nodes: [{ id: "1" }, { id: "2" }],
      edges: [
        { source: "1", target: "2" },
        { source: "2", target: "1" },
      ],
    };

    expect(() => complexTopologicalSort(workflow)).toThrow(/Cycle detected/);
  });
});
