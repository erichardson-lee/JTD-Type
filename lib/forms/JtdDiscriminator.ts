import { JtdProperties, StaticProperties } from "./JtdProperties.ts";
import {
  CreateSchemaBase,
  Forms,
  Invalid,
  JtdSchema,
  JtdShared,
  JtdT,
  Narrow,
} from "./_api.ts";

type ExpandType<T> = T extends infer O ? { [k in keyof O]: O[k] } : never;

export type JtdDiscriminator<
  Discriminator extends string = string,
  // deno-lint-ignore no-explicit-any ban-types
  VMap extends { [key: string]: JtdProperties<any, any, any> } = {},
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
  Variant extends keyof VMap,
> = Variant extends string ? ExpandType<
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
  Add extends boolean = boolean,
> = {
  properties: {
    [k in Keys]: JtdSchema;
  };

  optionalProperties: {
    [k in oKeys]: JtdSchema;
  };

  additionalProperties: Add;
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
    Vars[k]["additionalProperties"]
  >;
};

export function Discriminator<
  D extends string,
  VMap extends VarMap<{
    properties: {
      [d in D]?: Invalid<"Cannot have the discriminator in the properties">;
    };
    optionalProperties: {
      [d in D]?: Invalid<
        "Cannot have the discriminator in the optional properties"
      >;
    };
  }>,
  O extends JtdShared = JtdShared,
>(discriminator: D, mapping: VMap, opts?: Narrow<O>) {
  const collisions = Object.entries(mapping)
    .filter(
      ([_key, value]) =>
        Object.hasOwn(value?.properties, discriminator) ||
        Object.hasOwn(value?.optionalProperties, discriminator),
    )
    .map(([k, v]) => `[${k}: ${v}]`);

  if (collisions.length > 0) {
    throw new SyntaxError(
      "Mapping cannot have key " +
        discriminator +
        " as this violates JTD Rules " +
        "(Discriminator can't be a key in the values)" +
        "included in the following variants: " +
        collisions.join(", "),
    );
  }

  const s = CreateSchemaBase("Discriminator", opts);

  return Object.assign(s, {
    discriminator,
    mapping: Object.fromEntries(
      Object.entries(mapping).map(([name, variant]) => [
        name,
        Forms.Properties(
          {
            properties: variant.properties,
            //@ts-expect-error Intentional Type Mismatch
            optionalProperties: variant.optionalProperties,
            additionalProperties: variant.additionalProperties,
          },
          { metadata: variant.metadata },
        ),
      ]),
    ),
  }) as JtdDiscriminator<D, CompileVariants<VMap>> & O;
}
