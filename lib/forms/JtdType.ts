import {
  CreateSchemaBase,
  ExpandType,
  JtdShared,
  JtdT,
  Narrow,
} from "./_api.ts";

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

export type JtdType<
  T extends JtdTypes = JtdTypes,
  O extends JtdShared = JtdShared,
> = ExpandType<
  & { type: T }
  & JtdT<"Type", O>
>;

export type StaticType<T extends JtdType> = T["type"] extends
  | "float32"
  | "float64"
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32" ? number
  : T["type"] extends "boolean" ? boolean
  : T["type"] extends "string" | "timestamp" ? string
  : never;

/**
 * Creates a JTD type schema
 * @param type The Datatype of the field
 * @param opts Options for the schema
 * @returns JTD Type Schema
 */
export function Type<
  T extends JtdTypes,
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(
  type: T,
  opts?: Narrow<O> | undefined,
) {
  const s = CreateSchemaBase("Type", opts);
  return Object.assign(s, { type }) as unknown as JtdType<T, O>;
}
