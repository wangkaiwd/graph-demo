import { WorkFlow } from "./types";

export const hasCycle = (workflow: WorkFlow) => {
  return false;
};

// FAQ:
// 1. visited 感觉没有用
// 2. 只要找到起点，dfs 遍历一次就能知道有没有环