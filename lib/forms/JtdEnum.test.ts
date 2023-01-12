import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";
import { Enum, StaticEnum } from "./index.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticEnum<typeof TestType>;
  const TestType = Enum(["test", "foo"]);

  assertObjectMatch(TestType, { enum: ["test", "foo"] });

  const _example: TestType = "foo";
  const _example2: TestType = "test";
});
