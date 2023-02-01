import {
  CreateSchemaBase,
  ExpandType,
  JtdShared,
  JtdT,
  Narrow,
} from "./_api.ts";

export type JtdEnum<
  E extends string = string,
  O extends JtdShared = JtdShared,
> = ExpandType<
  & { enum: E[] }
  & JtdT<"Enum", O>
>;

export type StaticEnum<E extends JtdEnum> = E["enum"] extends (infer K)[] ? K
  : never;

/**
 * Creates an enum JTD Schema
 * @param values The Possible Enum values (Must be unique)
 * @param opts Options for the schema
 * @returns JTD Enum Schema
 */
export function Enum<
  E extends string,
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(
  values: Narrow<E[]>,
  opts?: Narrow<O>,
) {
  if (new Set(values).size !== values.length) {
    throw new SyntaxError(`Enum has non-unique values`);
  }

  const s = CreateSchemaBase("Enum", opts);
  return Object.assign(s, { enum: values }) as unknown as JtdEnum<E, O>;
}
