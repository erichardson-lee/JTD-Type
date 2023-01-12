// deno-lint-ignore-file no-explicit-any

import { JtdElements } from "./index.ts";
import { JtdDiscriminator } from "./JtdDiscriminator.ts";
import { JtdEmpty } from "./JtdEmpty.ts";
import { JtdEnum } from "./JtdEnum.ts";
import { JtdProperties } from "./JtdProperties.ts";
import { JtdRef } from "./JtdRef.ts";
import { JtdType } from "./JtdType.ts";
import { JtdValues } from "./JtdValues.ts";

import type { Narrow } from "https://deno.land/x/ts_toolbelt_unofficial@1.1.0/sources/Function/Narrow.ts";
export { Narrow };

export const Kind = Symbol.for("JtdType.Kind");

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

export * as Forms from "../forms_functions.ts";
export type { Static } from "../static.ts";

/** JTD type (Util Type to add Shared Schema & Kind) */
export type JtdT<Type extends Kinds> = JtdShared & { [Kind]: Type };

export function CreateSchemaBase<K extends Kinds, O extends JtdShared>(
  kind: K,
  opts: Narrow<O> | undefined,
): { [Kind]: K } & NonNullable<O> {
  //@ts-expect-error Typing Weirdness
  return {
    [Kind]: kind,
    //@ts-expect-error Typing Weirdness
    metadata: opts?.metadata,
    //@ts-expect-error Typing Weirdness
    nullable: opts?.nullable,
  };
}

type ExpandType<T> = T extends infer O ? { [k in keyof O]: O[k] } : never;

// deno-lint-ignore ban-types
function _sanitiseObj(o: object): object {
  return Object.fromEntries(
    Object.entries(o)
      .map(([key, value]) => {
        if (typeof value === "object" && value != null) {
          return [key, _sanitiseObj(value)];
        }

        return [key, value];
      })
      .filter(([_key, value]) => {
        if (typeof value === "undefined") return false;

        return true;
      }),
  );
}

export function Sanitise<S extends JtdSchema>(
  schema: S,
): ExpandType<Omit<S, typeof Kind>> {
  return _sanitiseObj(schema) as ExpandType<Omit<S, typeof Kind>>;
}

export type Invalid<M extends string, D = unknown> =
  | never
  | { __error_message: M; __data: D };
