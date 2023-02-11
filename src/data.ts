import { Node } from "@/interfaces";
export const nodes: Node[] = [
  {
    type: "File Reader",
    image_src: "File-Reader.png",
    input: false,
    output: true,
  },
  {
    type: "Color Manager.png",
    image_src: "Color-Manager.png",
    input: true,
    output: true,
  },
  {
    type: "Statistics",
    image_src: "Statistics.png",
    input: true,
    output: false,
  },
  {
    type: "Partitioning",
    image_src: "Partitioning.png",
    input: true,
    output: true,
  },
  {
    type: "Tree Learner",
    image_src: "Tree-Learner.png",
    input: true,
    output: true,
  },
  {
    type: "Decision Tree Predictor",
    image_src: "Decision-Tree-Predictor.png",
    input: true,
    output: false,
  },
];
