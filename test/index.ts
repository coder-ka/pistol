import assert from "assert";
import { parse } from "../lib/index";

console.log(
  JSON.stringify(
    parse(`
- test(a,b) test(c,)
  - test
  - test(d(e))`)
  )
);

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
              name: "c",
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
                  arg: [
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
