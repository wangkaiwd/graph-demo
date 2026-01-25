import { describe, expect, it } from "vitest";
import { topologicalSortBfs } from "../topologicalSort";

describe("topological sort", () => {
  /**
   * https://media.geeksforgeeks.org/wp-content/uploads/20251027160427209436/frame_3269.webp
   */
  it("demo1", () => {
    const workflow = {
      nodes: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
      edges: [
        { source: "4", target: "2" },
        { source: "3", target: "2" },
        { source: "2", target: "1" },
        { source: "0", target: "1" },
      ],
    };
    const result = topologicalSortBfs(workflow);
    expect(result).toEqual([
      { id: "0" },
      { id: "3" },
      { id: "4" },
      { id: "2" },
      { id: "1" },
    ]);
  });
  // https://media.geeksforgeeks.org/wp-content/uploads/20251027160423006978/420046875.webp
  it("demo2", () => {
    const workflow = {
      nodes: [
        { id: "0" },
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
      ],
      edges: [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "4", target: "5" },
        { source: "5", target: "1" },
        { source: "5", target: "2" },
      ],
    };
    const result = topologicalSortBfs(workflow);
    expect(result).toEqual([
      { id: "0" },
      { id: "4" },
      { id: "5" },
      { id: "1" },
      { id: "2" },
      { id: "3" },
    ]);
  });
});
