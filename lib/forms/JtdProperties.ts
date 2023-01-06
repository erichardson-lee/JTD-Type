import {
  CreateSchemaBase,
  Forms,
  Invalid,
  JtdShared,
  JtdT,
  Narrow,
  SchemaObj,
  Static,
} from "./_api.ts";

export type JtdProperties<
  Props extends SchemaObj = SchemaObj,
  OptProps extends SchemaObj = SchemaObj,
  AddProps extends boolean | undefined = boolean | undefined,
> = JtdT<"Properties"> & {
  properties: Props;
  optionalProperties: OptProps;
  additionalProperties: AddProps;
};

type ExpandType<T> = T extends infer O ? { [k in keyof O]: O[k] } : never;

export type StaticProperties<P extends JtdProperties> = ExpandType<
  // deno-lint-ignore ban-types
  & (P["additionalProperties"] extends true ? { [k: string]: unknown } : {})
  & {
    [k in keyof P["properties"]]: Static<P["properties"][k]>;
  }
  & {
    [k in keyof P["optionalProperties"]]?: Static<P["optionalProperties"][k]>;
  }
>;
/**
 * Create a Properties Object
 * @param properties The (Non Optional) properties for the object
 * @param optionalProperties The Optional properties for the object
 * @param additionalProperties Allow additional Properties?
 * @param metadata Metadata
 * @returns JTD Property Schema
 *
 * @throws {SyntaxError} if any keys in {@link properties} and {@link optionalProperties} overlap.
 */
export function Properties<
  Props extends SchemaObj,
  // Based on https://stackoverflow.com/a/59345277
  OProps extends
    & {
      [K in keyof OProps]: K extends keyof Props ? Invalid<"Duplicate Key">
        : OProps[K];
    }
    & SchemaObj,
  AddProps extends boolean,
  O extends JtdShared,
>(
  data: {
    properties: Props;
    optionalProperties?: OProps;
    additionalProperties?: AddProps;
  } | {
    properties?: Props;
    optionalProperties: OProps;
    additionalProperties?: AddProps;
  },
  opts?: Narrow<O>,
) {
  if (
    Object.hasOwn(data, "properties") &&
    Object.hasOwn(data, "optionalProperties")
  ) {
    const PKeys = new Set(Object.keys(data.properties!));
    const overlap = Object.keys(data.optionalProperties!).filter((key) =>
      PKeys.has(key)
    );

    if (overlap.length > 0) {
      throw new SyntaxError(
        "Properties and Optional Properties have the shared keys, " +
          JSON.stringify(overlap) +
          " this violates JTD Rules",
      );
    }
  }

  const s = CreateSchemaBase("Properties", opts);
  return Object.assign(s, data) as JtdProperties<Props, OProps, AddProps> & O;
}

//
// Testing
//
if (import.meta.main) {
  type TestType = StaticProperties<typeof TestType>;
  const TestType = Properties(
    {
      properties: { test: Forms.Empty(), foo: Forms.Type("float64") },
      optionalProperties: { bar: Forms.Type("int8", { nullable: true }) },
      additionalProperties: false,
    },
  );
  console.log(JSON.stringify(TestType, undefined, 2));

  const _example: TestType = {
    test: {},
    foo: 212345,
    bar: 123e5,
  };
}
