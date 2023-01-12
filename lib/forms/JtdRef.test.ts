import { CreateDefinition, Forms } from "./_api.ts";
import { Ref, StaticRef } from "./JtdRef.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

const definition = CreateDefinition({
  example: Forms.Type("float32", { metadata: {} }),
  example2: Forms.Properties({
    properties: { foo: Forms.Type("float32") },
    additionalProperties: false,
  }),
});

Deno.test("Basic functionality 1", () => {
  type TestType = StaticRef<typeof TestType>;
  const TestType = Ref(definition, "example");

  assertObjectMatch(TestType, { ref: "example" });

  const _example: TestType = 1234;
});

Deno.test("Basic functionality 1", () => {
  type TestType = StaticRef<typeof TestType>;
  const TestType = Ref(definition, "example2");

  assertObjectMatch(TestType, { ref: "example2" });

  const _example2: TestType = {
    foo: 123456,
  };
});
