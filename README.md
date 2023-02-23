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
        "type": "fn",
        "value": {
          "name": "test",
          "args": [
            {
              "type": "fn",
              "value": { "type": "fn", "value": { "name": "a", "args": [] } }
            },
            {
              "type": "fn",
              "value": { "type": "fn", "value": { "name": "b", "args": [] } }
            }
          ]
        }
      },
      {
        "type": "fn",
        "value": {
          "name": "test",
          "args": [
            {
              "type": "fn",
              "value": { "type": "fn", "value": { "name": "c", "args": [] } }
            }
          ]
        }
      }
    ],
    "children": [
      {
        "items": [{ "type": "fn", "value": { "name": "test", "args": [] } }],
        "children": []
      },
      {
        "items": [
          {
            "type": "fn",
            "value": {
              "name": "test",
              "args": [
                {
                  "type": "fn",
                  "value": {
                    "type": "fn",
                    "value": {
                      "name": "d",
                      "args": [
                        {
                          "type": "fn",
                          "value": {
                            "type": "fn",
                            "value": { "name": "e", "args": [] }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        "children": []
      }
    ]
  }
]
```
