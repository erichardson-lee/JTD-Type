import {
  CreateDefinition,
  CreateSchemaBase,
  JtdDefinitions,
  JtdShared,
  JtdT,
  Schema,
} from "./index.ts";
import { SKeys } from "./SKeys.ts";
import { Static } from "./Static.ts";
import { Narrow } from "./toolbox.ts";

export const Def = Symbol.for("JtdType.Def");

type CompiledDefs<D extends JtdDefinitions> = {
  [k in keyof D]: Static<D[k]>;
};

export type JtdRef<
  DefT extends JtdDefinitions = JtdDefinitions,
  Ref extends SKeys<DefT> = SKeys<DefT>,
  CDef extends CompiledDefs<DefT> = CompiledDefs<DefT>,
> = JtdT<"Ref"> & {
  [Def]: CDef;
  ref: Ref;
};

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
  O extends JtdShared,
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
  }) as JtdRef<DefT, Ref, CompiledDefs<DefT>> & O;
}

//
// Tests
//

if (import.meta.main) {
  type ExpandType<T> = T extends infer O ? { [k in keyof O]: ExpandType<O[k]> }
    : never;

  const definition = CreateDefinition({
    example: Schema.Empty({ metadata: {} }),
    example2: Schema.Properties({ foo: Schema.Type("float32") }, {}, false),
  });

  type TestType = StaticRef<typeof TestType>;
  const TestType = Ref(definition, "example");

  console.log(JSON.stringify(TestType, undefined, 2));

  // Should allow anything, since it's an empty schema
  const _example: TestType = {
    foo: "bar",
    baz: 1243,
  };

  type TestType2 = StaticRef<typeof TestType2>;
  const TestType2 = Ref(definition, "example2");

  console.log(JSON.stringify(TestType2, undefined, 2));

  type T = ExpandType<TestType2>;

  const _example2: TestType2 = {
    foo: 123456,
  };
}
