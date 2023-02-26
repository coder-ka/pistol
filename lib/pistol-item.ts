import {
  Expression,
  translate,
  seq,
  word,
  opt,
  zom,
  lazy,
  or,
  ignore,
  notEmpty,
  map,
  str,
  regex,
  GetExprValue,
} from "parten";

const whitespaces = ignore(regex(/ +/));
const trim = <T>(expr: Expression<T>) =>
  map(
    seq`${opt(whitespaces)}${expr}${opt(whitespaces)}`,
    ([value]) => value as T
  );
const comma = ignore(str(","));
const bracketStart = ignore(str("("));
const bracketEnd = ignore(str(")"));

const nullLiteral = map(str("null"), () => ({ type: "null" }));
const booleanLiteral = map(
  or(str("true"), str("false")),
  (value: "true" | "false") => ({
    type: "boolean",
    value,
  })
);
const stringLiteral = map(seq`"${regex(/([^"\\]|\\.)*/)}"`, ([value]) => ({
  type: "string",
  value,
}));
const numberLiteral = map(notEmpty(regex(/\d*(\.\d+)?/)), (value: string) => ({
  type: "number",
  value: Number(value),
}));

const item = or(
  nullLiteral,
  or(
    booleanLiteral,
    or(
      stringLiteral,
      or(
        numberLiteral,
        map(lazy(fn), (value) => ({
          type: "fn",
          value,
        }))
      )
    )
  )
);

type Item = GetExprValue<typeof item>;
function args(): Expression<Item[]> {
  const rest = map(opt(seq`${trim(comma)}${opt(lazy(args))}`), (value) => {
    if (value === undefined) return undefined;

    return value[0];
  });

  return map(seq<Item | Item[] | undefined>`${trim(item)}${rest}`, (value) => {
    return value.flatMap((x) =>
      x === undefined ? [] : Array.isArray(x) ? x : [x]
    );
  });
}

type Fn = {
  name: string;
  args: Item[];
};
function fn(): Expression<Fn> {
  const name = map(word(), (name) => ({ name }));
  const callArgs = map(
    opt(seq`${bracketStart}${opt(args())}${bracketEnd}`),
    (value) => {
      // TODO enhance seq parameter type inference.
      if (value === undefined) return [];
      const args = value[0];
      if (args === undefined) return [];
      return args;
    }
  );

  return map(seq<{ name: string } | Item[]>`${name}${callArgs}`, (value) => {
    // TODO enhance seq type inference
    const name = value[0];
    if (Array.isArray(name)) return null as never;
    const args = value[1];
    if (!Array.isArray(args)) return null as never;

    return {
      name: name.name,
      args,
    };
  });
}

export type PistolItem = Item[];
const pistolItem = map(zom(or(whitespaces, item)), (value) =>
  value.flatMap((x) => (x === undefined ? [] : [x]))
);

export function parsePistolItem(text: string): PistolItem {
  const { value } = translate(text, pistolItem);

  return value;
}
