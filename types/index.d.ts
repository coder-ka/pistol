export type FnItem = {
    name: string;
    args: FnItem[];
};
export type Node = {
    items: FnItem[];
    children: Node[];
};
export declare function parse(code: string): Node[];
//# sourceMappingURL=index.d.ts.map