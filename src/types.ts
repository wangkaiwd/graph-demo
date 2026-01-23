export interface TNode {
  id: string;
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
