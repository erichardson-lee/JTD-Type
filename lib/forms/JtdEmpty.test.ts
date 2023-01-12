import { Empty, StaticEmpty } from "./index.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic functionality", () => {
  type TestType = StaticEmpty<typeof TestType>;
  const TestType = Empty({
    metadata: { foo: { bar: "baz" } },
    nullable: false,
  });

  assertObjectMatch(TestType, {
    metadata: { foo: { bar: "baz" } },
    nullable: false,
  });

  // should allow anything
  const _example: TestType = {
    foo: "bar",
    baz: 1243,
  };
});
