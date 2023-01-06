import { JtdProperties, StaticProperties } from "./JtdProperties.ts";
import {
  CreateSchemaBase,
  JtdSchema,
  JtdShared,
  JtdT,
  Invalid,
  Narrow,
  Forms,
} from "./_api.ts";

type ExpandType<T> = T extends infer O ? { [k in keyof O]: O[k] } : never;

export type JtdDiscriminator<
  Discriminator extends string = string,
  // deno-lint-ignore no-explicit-any ban-types
  VMap extends { [key: string]: JtdProperties<any, any, any> } = {}
> = ExpandType<
  JtdT<"Discriminator"> & {
    discriminator: Discriminator;
    mapping: VMap;
  }
>;

type GetVariants<
  // deno-lint-ignore no-explicit-any
  VMap extends { [key: string]: JtdProperties<any, any, any> },
  DStr extends string,
  Variant extends keyof VMap
> = Variant extends string
  ? ExpandType<
      {
        [d in DStr]: Variant;
      } & StaticProperties<VMap[Variant]>
    >
  : Invalid<"Non String Key Found on Object", Variant>;

export type StaticDiscriminator<D extends JtdDiscriminator> = GetVariants<
  D["mapping"],
  D["discriminator"],
  keyof D["mapping"]
>;

type Variant<
  Keys extends string = string,
  oKeys extends string = string,
  Add extends boolean = boolean
> = {
  properties: {
    [k in Keys]: JtdSchema;
  };

  optionalProperties: {
    [k in oKeys]: JtdSchema;
  };

  additionalKeys: Add;
  metadata?: JtdShared["metadata"];
};

// deno-lint-ignore ban-types
type VarMap<Ex = {}> = {
  [k: string]: Variant & Ex;
};

// deno-lint-ignore ban-types
type CompileVariants<Vars extends VarMap<{}>> = {
  [k in keyof Vars]: JtdProperties<
    Vars[k]["properties"],
    Vars[k]["optionalProperties"],
    Vars[k]["additionalKeys"]
  >;
};

export function Discriminator<
  D extends string,
  VMap extends VarMap<{
    properties: {
      [d in D]?: Invalid<"Cannot have the discriminator in the properties">;
    };
    optionalProperties: {
      [d in D]?: Invalid<"Cannot have the discriminator in the optional properties">;
    };
  }>,
  O extends JtdShared = JtdShared
>(discriminator: D, mapping: VMap, opts?: Narrow<O>) {
  const collisions = Object.entries(mapping)
    .filter(
      ([_key, value]) =>
        Object.hasOwn(value?.properties, discriminator) ||
        Object.hasOwn(value?.optionalProperties, discriminator)
    )
    .map(([k, v]) => `[${k}: ${v}]`);

  if (collisions.length > 0) {
    throw new SyntaxError(
      "Mapping cannot have key " +
        discriminator +
        " as this violates JTD Rules " +
        "(Discriminator can't be a key in the values)" +
        "included in the following variants: " +
        collisions.join(", ")
    );
  }

  const s = CreateSchemaBase("Discriminator", opts);

  return Object.assign(s, {
    discriminator,
    mapping: Object.values(mapping).map((variant) =>
      Forms.Properties(
        variant.properties,
        variant.optionalProperties,
        variant.additionalKeys,
        { metadata: variant.metadata }
      )
    ),
  }) as JtdDiscriminator<D, CompileVariants<VMap>> & O;
}

//
// Testing
//
if (import.meta.main) {
  type TestType = StaticDiscriminator<typeof TestType>;
  const TestType = Discriminator("test", {
    foo: {
      properties: {
        foo: Forms.Empty(),
      },
      optionalProperties: {},
      additionalKeys: false,
    },
    bar: {
      properties: { brightness: Forms.Type("int8") },
      optionalProperties: { height: Forms.Type("int16") },
      additionalKeys: false,
    },
  });
  console.log(JSON.stringify(TestType, undefined, 2));

  const _example: TestType = {
    test: "foo",
    foo: ["Anything goes here (it's an empty schema)"],
  };
  const _example2: TestType = {
    test: "bar",
    brightness: 123,
    height: 486,
  };
}