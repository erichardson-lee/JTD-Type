import {
  CreateSchemaBase,
  ExpandType,
  JtdSchema,
  JtdShared,
  JtdT,
  Narrow,
  Static,
} from "./_api.ts";

export type JtdValues<
  // deno-lint-ignore no-explicit-any
  V extends JtdSchema = any,
  O extends JtdShared = JtdShared,
> = ExpandType<
  & { values: V }
  & JtdT<"Values", O>
>;

export type StaticValues<V extends JtdValues> = Record<
  string,
  Static<V["values"]>
>;

/**
 * Creates a values schema (key/value, pairs with string keys)
 * @param values The value Type
 * @param opts Options for the schema
 * @returns JTD Values Schema
 */
export function Values<
  V extends JtdSchema,
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(
  values: V,
  opts?: Narrow<O>,
) {
  const s = CreateSchemaBase("Values", opts);
  return Object.assign(s, { values }) as unknown as JtdValues<V, O>;
}
