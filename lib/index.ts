import { parse as parseListol, Node as ListolNode } from "listol";
import { parsePistolItem, PistolItem } from "./pistol-item";

export type Node = {
  items: PistolItem;
  children: Node[];
};

export function parse(code: string): Node[] {
  const nodes = parseListol(code);

  function lnode2pnode(node: ListolNode): Node {
    return {
      items: parsePistolItem(node.text),
      children: node.children.map(lnode2pnode),
    };
  }

  return nodes.map(lnode2pnode);
}
