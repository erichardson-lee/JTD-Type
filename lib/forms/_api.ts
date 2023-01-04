import type { Narrow } from "https://deno.land/x/ts_toolbelt_unofficial@1.1.0/sources/Function/Narrow.ts";
export { Narrow };

import { Kinds, Kind, JtdShared } from "../index.ts";

export type {
  JtdSchema,
  JtdShared,
  SchemaObj,
  JtdDefinitions,
} from "../index.ts";
export { Forms, CreateDefinition } from "../index.ts";

export type { Static } from "../static.ts";

/** JTD type (Util Type to add Shared Schema & Kind) */
export type JtdT<Type extends Kinds> = JtdShared & { [Kind]: Type };

export function CreateSchemaBase<K extends Kinds, O extends JtdShared>(
  kind: K,
  opts: Narrow<O> | undefined
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

export type Invalid<M extends string, D = unknown> =
  | never
  | { __error_message: M; __data: D };
