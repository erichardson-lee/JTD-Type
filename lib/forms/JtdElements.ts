import {
  CreateSchemaBase,
  JtdSchema,
  JtdShared,
  JtdT,
  Narrow,
  Static,
} from "./_api.ts";

// deno-lint-ignore no-explicit-any
export type JtdElements<E extends JtdSchema = any> = JtdT<"Elements"> & {
  elements: E;
};

export type StaticElements<E extends JtdElements> = Static<E["elements"]>[];

/**
 * Creates an elements JTD schema (Array)
 * @param elements The type of the elements of the array
 * @param opts Options for the schema
 * @returns JTD Elements Schema
 */
export function Elements<E extends JtdSchema, O extends JtdShared>(
  elements: E,
  opts?: Narrow<O>,
) {
  const s = CreateSchemaBase("Elements", opts);
  return Object.assign(s, { elements }) as JtdElements<E> & O;
}
