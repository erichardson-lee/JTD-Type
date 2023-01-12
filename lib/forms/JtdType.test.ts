import { StaticType, Type } from "./JtdType.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticType<typeof TestType>;
  const TestType = Type("int32");

  assertObjectMatch(TestType, { type: "int32" });

  const _example: TestType = 1234;
});
