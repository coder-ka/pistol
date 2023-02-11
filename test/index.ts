import assert from "assert";
import { parse } from "../lib/index";

assert.deepStrictEqual(
  parse(`
- test(a,b) test(c,)
  - test
  - test(d(e))`),
  [
    {
      items: [
        {
          name: "test",
          args: [
            {
              name: "a",
              args: [],
            },
            {
              name: "b",
              args: [],
            },
          ],
        },
        {
          name: "test",
          args: [
            {
              name: "c",
              args: [],
            },
          ],
        },
      ],
      children: [
        {
          items: [
            {
              name: "test",
              args: [],
            },
          ],
          children: [],
        },
        {
          items: [
            {
              name: "test",
              args: [
                {
                  name: "d",
                  args: [
                    {
                      name: "e",
                      args: [],
                    },
                  ],
                },
              ],
            },
          ],
          children: [],
        },
      ],
    },
  ]
);
