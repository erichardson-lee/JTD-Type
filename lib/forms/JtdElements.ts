import {
  CreateSchemaBase,
  ExpandType,
  JtdSchema,
  JtdShared,
  JtdT,
  Narrow,
  Static,
} from "./_api.ts";

export type JtdElements<
  // deno-lint-ignore no-explicit-any
  E extends JtdSchema = any,
  O extends JtdShared = JtdShared,
> = ExpandType<
  & { elements: E }
  & JtdT<"Elements", O>
>;

export type StaticElements<E extends JtdElements> = Static<E["elements"]>[];

/**
 * Creates an elements JTD schema (Array)
 * @param elements The type of the elements of the array
 * @param opts Options for the schema
 * @returns JTD Elements Schema
 */
export function Elements<
  E extends JtdSchema,
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(
  elements: E,
  opts?: Narrow<O>,
) {
  const s = CreateSchemaBase("Elements", opts);
  return Object.assign(s, { elements }) as unknown as JtdElements<E, O>;
}
