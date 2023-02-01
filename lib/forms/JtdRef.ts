import {
  CreateSchemaBase,
  ExpandType,
  JtdDefinitions,
  JtdShared,
  JtdT,
  Narrow,
  Static,
} from "./_api.ts";

export const Def = Symbol.for("JtdType.Def");

/** Returns the string keys of an object */
type SKeys<T> = Extract<keyof T, string>;

type CompiledDefs<D extends JtdDefinitions> = {
  [k in keyof D]: Static<D[k]>;
};

export type JtdRef<
  DefT extends JtdDefinitions = JtdDefinitions,
  Ref extends SKeys<DefT> = SKeys<DefT>,
  CDef extends CompiledDefs<DefT> = CompiledDefs<DefT>,
  O extends JtdShared = JtdShared,
> = ExpandType<
  & { [Def]: CDef; ref: Ref }
  & JtdT<"Ref", O>
>;

export type StaticRef<R extends JtdRef> = R[typeof Def][R["ref"]];
// export type StaticRef<R extends JtdRef> = GetRefType<R> extends JtdSchema
//   ? // ? Static<GetRefType<R>>
//     GetRefType<R>
//   : never;

/**
 * Creates a JTD Reference Schema
 * @param definitions The definitions to reference
 * @param ref The Key in the definitions to reference
 * @param opts The Options for this schema
 * @returns JTD Ref Schema
 * @throws {SyntaxError} if key {@link ref} is not in {@link definitions}
 */
export function Ref<
  DefT extends JtdDefinitions,
  Ref extends SKeys<DefT>,
  O extends JtdShared = { nullable: undefined; metadata: undefined },
>(definitions: DefT, ref: Ref, opts?: Narrow<O>) {
  if (!Object.hasOwn(definitions, ref)) {
    throw new SyntaxError(
      `Invalid Reference Key ${ref}, value not found in definition`,
    );
  }
  const s = CreateSchemaBase("Ref", opts);

  return Object.assign(s, {
    [Def]: definitions as CompiledDefs<DefT>,
    ref,
  }) as unknown as JtdRef<DefT, Ref, CompiledDefs<DefT>, O>;
}
