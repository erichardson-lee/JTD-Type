import { CreateSchemaBase, JtdShared, JtdT, Narrow } from "./_api.ts";

export type JtdEnum<E extends string = string> = JtdT<"Enum"> & { enum: E[] };

export type StaticEnum<E extends JtdEnum> = E["enum"] extends (infer K)[] ? K
  : never;

/**
 * Creates an enum JTD Schema
 * @param values The Possible Enum values (Must be unique)
 * @param opts Options for the schema
 * @returns JTD Enum Schema
 */
export function Enum<E extends string, O extends JtdShared>(
  values: Narrow<E[]>,
  opts?: Narrow<O>,
) {
  if (new Set(values).size !== values.length) {
    throw new SyntaxError(`Enum has non-unique values`);
  }

  const s = CreateSchemaBase("Enum", opts);
  return Object.assign(s, { enum: values }) as JtdEnum<E> & O;
}
