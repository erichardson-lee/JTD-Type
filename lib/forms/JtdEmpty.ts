import {
  CreateSchemaBase,
  ExpandType,
  JtdShared,
  JtdT,
  Narrow,
} from "./_api.ts";

export type JtdEmpty<O extends JtdShared = JtdShared> = ExpandType<
  JtdT<"Empty", O>
>;

export type StaticEmpty<_JtdEmpty> = unknown;

/**
 * Creates an empty JTD schema (Allows for any value to be passed in here)
 * @param opts Options for the schema
 * @returns JTD Empty Schema
 */
export function Empty<
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(opts?: Narrow<O>) {
  return CreateSchemaBase("Empty", opts) as unknown as JtdEmpty<O>;
}
