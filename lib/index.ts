// deno-lint-ignore-file no-explicit-any

import type {
  JtdDiscriminator,
  JtdElements,
  JtdEmpty,
  JtdEnum,
  JtdProperties,
  JtdRef,
  JtdType,
  JtdValues,
} from "./forms/index.ts";

export const Kind = Symbol.for("JtdType.Kind");

export * as Forms from "./forms.ts";

export type JtdRoot<Definitions extends JtdDefinitions | undefined> =
  & JtdSchema
  & {
    // Def only keys
    definitions: Definitions;
  };

export type JtdSchema =
  & (JtdShared & { [Kind]: Kinds })
  & (
    | JtdRef<any>
    | JtdType
    | JtdEnum
    | JtdElements<any>
    | JtdProperties<any, any, any>
    | JtdValues<any>
    | JtdDiscriminator<string, any>
    | JtdEmpty
  );
export type SchemaObj = { [k: string]: JtdSchema | undefined };
export type JtdDefinitions = { [k: string]: JtdSchema };

export function CreateDefinition<D extends { [k: string]: { [Kind]: Kinds } }>(
  definition: D,
) {
  return definition as D & JtdDefinitions;
}

export type JtdShared = {
  metadata?: { [k: string]: unknown } | undefined;
  nullable?: boolean | undefined;
};

export type Kinds =
  | "Ref"
  | "Type"
  | "Enum"
  | "Elements"
  | "Properties"
  | "Values"
  | "Discriminator"
  | "Empty";
