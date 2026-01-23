// https://www.geeksforgeeks.org/dsa/detect-cycle-in-a-graph/

const workflow1 = {
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

const hasCycle = () => {};
