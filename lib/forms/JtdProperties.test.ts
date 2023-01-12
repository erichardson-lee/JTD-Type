import { Properties, StaticProperties } from "./index.ts";
import { Forms } from "./_api.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticProperties<typeof TestType>;
  const TestType = Properties(
    {
      properties: { test: Forms.Empty(), foo: Forms.Type("float64") },
      optionalProperties: { bar: Forms.Type("int8", { nullable: true }) },
      additionalProperties: false,
    },
  );

  assertObjectMatch(TestType, {
    properties: { test: {}, foo: { type: "float64" } },
    optionalProperties: { bar: { type: "int8", nullable: true } },
    additionalProperties: false,
  });

  const _example: TestType = {
    test: {},
    foo: 212345,
    bar: 123e5,
  };
});
