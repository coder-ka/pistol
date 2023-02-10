import { parse as parseListol, Node as LNode } from "listol";

export type FnItem = {
  name: string;
  args: FnItem[];
};

export type Node = {
  items: FnItem[];
  children: Node[];
};

export function parse(code: string): Node[] {
  const nodes = parseListol(code);

  function lnode2pnode(node: LNode): Node {
    return {
      items: node.text
        .split(" ")
        .filter((x) => x !== "")
        .map(toFnItem),
      children: node.children.map(lnode2pnode),
    };
  }

  function toFnItem(str: string): FnItem {
    const match = str.match(/^([^\(]+)\((.+)\)$/);
    if (match === null) return { name: str, args: [] };

    const [_, name, argsText] = match;

    return {
      name,
      args: argsText
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x !== "")
        .map(toFnItem),
    };
  }

  return nodes.map(lnode2pnode);
}
