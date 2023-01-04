import {
  CreateSchemaBase,
  JtdSchema,
  JtdShared,
  JtdT,
  Schema,
} from "./index.ts";
import { Static } from "./Static.ts";
import { Narrow } from "./toolbox.ts";

// deno-lint-ignore no-explicit-any
export type JtdValues<V extends JtdSchema = any> = JtdT<"Values"> & {
  values: V;
};

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
export function Values<V extends JtdSchema, O extends JtdShared = JtdShared>(
  values: V,
  opts?: Narrow<O>,
) {
  const s = CreateSchemaBase("Values", opts);
  return Object.assign(s, { values }) as JtdValues<V> & O;
}

//
// Testing
///
if (import.meta.main) {
  type TestType = StaticValues<typeof TestType>;
  const TestType = Values(Schema.Type("float64"));
  console.log(JSON.stringify(TestType, undefined, 2));

  const _example: TestType = {
    foo: 123,
    bar: 456,
  };
}
