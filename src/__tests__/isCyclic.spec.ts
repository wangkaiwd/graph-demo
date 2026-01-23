import { describe, expect, it } from "vitest";
import { isCyclic } from "../isCyclic";

describe("isCyclic", () => {
  it("should return false when graph has not cycle", () => {
    const workflow = {
      nodes: [
        { id: "start" },
        { id: "llm1" },
        { id: "llm2" },
        { id: "summary" },
        { id: "end" },
      ],
      edges: [
        { source: "start", target: "llm1" },
        { source: "start", target: "llm2" },
        { source: "llm1", target: "summary" },
        { source: "llm2", target: "summary" },
        { source: "summary", target: "end" },
      ],
    };
    expect(isCyclic(workflow)).toBe(false);
  });
  it("should return true when graph has cycle", () => {
    const workflow = {
      nodes: [
        { id: "start" },
        { id: "llm1" },
        { id: "llm2" },
        { id: "summary" },
        { id: "end" },
      ],
      edges: [
        { source: "start", target: "llm1" },
        { source: "start", target: "llm2" },
        { source: "llm1", target: "summary" },
        { source: "llm2", target: "summary" },
        { source: "summary", target: "end" },
        { source: "summary", target: "llm1" },
      ],
    };
    expect(isCyclic(workflow)).toBe(true);
  });
  it("unconnected graph", () => {
    const workflow = {
      nodes: [
        { id: "start" },
        { id: "llm1" },
        { id: "llm2" },
        { id: "summary" },
        { id: "end" },
      ],
      edges: [
        { source: "start", target: "llm1" },
        { source: "llm2", target: "summary" },
        { source: "summary", target: "end" },
      ],
    };
    expect(isCyclic(workflow)).toBe(false);
  });
});
