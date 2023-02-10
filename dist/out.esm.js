"use strict";
(() => {
  // ../listol/dist/my-lib.es.js
  function parse(code) {
    const lines = code.split(/\r?\n/);
    function linesToNodes(preIndent, nodes) {
      let line = void 0;
      do {
        line = lines.shift();
      } while (line === "");
      if (line === void 0)
        return nodes;
      while (line[line.length - 1] === "\\") {
        const nextLine = lines.shift();
        if (nextLine === void 0)
          break;
        line = `${line.slice(0, line.length - 1)}${nextLine.trimStart()}`;
      }
      const lineMatch = line.match(/^( *)(-)?(.+)$/m);
      if (lineMatch === null)
        return nodes;
      let [_1, whitespaces, _2, textSection] = lineMatch;
      const indent = whitespaces.length;
      const text = textSection.trimStart();
      if (indent > preIndent) {
        const children = linesToNodes(indent + 1, []);
        return [
          {
            text,
            children
          }
        ].concat(linesToNodes(indent, []));
      } else if (indent === preIndent) {
        return nodes.concat([
          {
            text,
            children: linesToNodes(indent + 1, [])
          }
        ]).concat(linesToNodes(indent, []));
      } else {
        lines.unshift(line);
        return nodes;
      }
    }
    return linesToNodes(0, []);
  }

  // lib/index.ts
  function parse2(code) {
    const nodes = parse(code);
    function lnode2pnode(node) {
      return {
        items: node.text.split(" ").filter((x) => x !== "").map(toFnItem),
        children: node.children.map(lnode2pnode)
      };
    }
    function toFnItem(str) {
      const match = str.match(/^(.+)(\([^\)]+\))$/);
      if (match === null)
        return { name: str, args: [] };
      const [_, name, argsText] = match;
      return {
        name,
        args: argsText.split(",").map((x) => x.trim()).filter((x) => x !== "").map(toFnItem)
      };
    }
    return nodes.map(lnode2pnode);
  }
})();
