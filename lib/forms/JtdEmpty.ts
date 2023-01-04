import { CreateSchemaBase, JtdShared, JtdT } from "./index.ts";
import type { Narrow } from "./toolbox.ts";

export type JtdEmpty = JtdT<"Empty">;

export type StaticEmpty<JtdEmpty> = unknown;

/**
 * Creates an empty JTD schema (Allows for any value to be passed in here)
 * @param opts Options for the schema
 * @returns JTD Empty Schema
 */
export function Empty<O extends JtdShared>(opts?: Narrow<O>) {
  return CreateSchemaBase("Empty", opts) as JtdEmpty & O;
}

//
// Testing
//
if (import.meta.main) {
  type TestType = StaticEmpty<typeof TestType>;
  const TestType = Empty({
    metadata: { foo: { bar: "baz" } },
    nullable: false,
  });

  console.log(JSON.stringify(TestType, undefined, 2));

  // should allow anything
  const _example: TestType = {
    foo: "bar",
    baz: 1243,
  };
}
