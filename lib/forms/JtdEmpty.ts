import { CreateSchemaBase, JtdShared, JtdT, Narrow } from "./_api.ts";

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
