export interface Node {
  type: string;
  image_src: string;
  input: boolean;
  output: boolean;
}

export interface WorkflowNode extends Node {
  name: string;
  inputNode: WorkflowNode | null;
  outputNode: WorkflowNode | null;
}
