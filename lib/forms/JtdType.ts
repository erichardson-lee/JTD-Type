import { CreateSchemaBase, JtdShared, JtdT, Narrow } from "./_api.ts";

export type JtdTypes =
  | "boolean"
  | "float32"
  | "float64"
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32"
  | "string"
  | "timestamp";

export type JtdType<T extends JtdTypes = JtdTypes> = JtdT<"Type"> & { type: T };

export type StaticType<T extends JtdType> = T["type"] extends
  | "float32"
  | "float64"
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32"
  ? number
  : T["type"] extends "boolean"
  ? boolean
  : T["type"] extends "string" | "timestamp"
  ? string
  : never;

/**
 * Creates a JTD type schema
 * @param type The Datatype of the field
 * @param opts Options for the schema
 * @returns JTD Type Schema
 */
export function Type<T extends JtdTypes, O extends JtdShared>(
  type: T,
  opts?: Narrow<O> | undefined
) {
  const s = CreateSchemaBase("Type", opts, { type });
  return s as JtdType<T> & O;
}

//
// Testing
//
if (import.meta.main) {
  type TestType = StaticType<typeof TestType>;
  const TestType = Type("int32");

  console.log(JSON.stringify(TestType, undefined, 2));

  const _example: TestType = 1234;
}
