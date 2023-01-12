import { Elements, StaticElements } from "./index.ts";
import { Forms } from "./_api.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticElements<typeof TestType>;
  const TestType = Elements(Forms.Type("float64"));

  assertObjectMatch(TestType, { elements: { type: "float64" } });

  const _example: TestType = [1, 2, 3, 4, 5];
});
