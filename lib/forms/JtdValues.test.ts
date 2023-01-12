import { Forms } from "./_api.ts";
import { StaticValues, Values } from "./JtdValues.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticValues<typeof TestType>;
  const TestType = Values(Forms.Type("float64"));

  assertObjectMatch(TestType, { values: { type: "float64" } });

  const _example: TestType = {
    foo: 123,
    bar: 456,
  };
});
