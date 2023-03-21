import assert from "assert";
import { parse } from "../lib/index";

const actual = parse(`
- test(a,b) test(c,)
  - test
  - test(d(e))`);

assert.deepStrictEqual(actual, [
  {
    items: [
      {
        type: "fn",
        value: {
          name: "test",
          args: [
            {
              type: "fn",
              value: { name: "a", args: [] },
            },
            {
              type: "fn",
              value: { name: "b", args: [] },
            },
          ],
        },
      },
      {
        type: "fn",
        value: {
          name: "test",
          args: [
            {
              type: "fn",
              value: { name: "c", args: [] },
            },
          ],
        },
      },
    ],
    children: [
      {
        items: [{ type: "fn", value: { name: "test", args: [] } }],
        children: [],
      },
      {
        items: [
          {
            type: "fn",
            value: {
              name: "test",
              args: [
                {
                  type: "fn",
                  value: {
                    name: "d",
                    args: [
                      {
                        type: "fn",
                        value: { name: "e", args: [] },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
        children: [],
      },
    ],
  },
]);
