# PISTOL

PISTOL is subset language of [LISTOL](https://github.com/coder-ka/listol).

Additional features are below.

- list items can be split by space.
- function-call like syntax.

example:

```pistol
- test(a,b) test(c,)
  - test
  - test(d(e))
```

converted JSON example:

```json
[
  {
    "items": [
      {
        "name": "test",
        "args": [
          { "name": "a", "args": [] },
          { "name": "b", "args": [] }
        ]
      },
      { "name": "test", "args": [{ "name": "c", "args": [] }] }
    ],
    "children": [
      { "items": [{ "name": "test", "args": [] }], "children": [] },
      {
        "items": [
          {
            "name": "test",
            "args": [{ "name": "d", "args": [{ "name": "e", "args": [] }] }]
          }
        ],
        "children": []
      }
    ]
  }
]
```
