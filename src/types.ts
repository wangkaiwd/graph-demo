export interface TNode {
  id: string;
  type?: string; // e.g., 'start', 'end', 'task', 'loop'
  subWorkflow?: WorkFlow; // for loop nodes
  [key: string]: any;
}

export interface TEdge {
  source: string;
  target: string;
}

export interface WorkFlow {
  nodes: TNode[];
  edges: TEdge[];
}
