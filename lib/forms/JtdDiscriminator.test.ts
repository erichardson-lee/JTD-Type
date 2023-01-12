import { Discriminator, StaticDiscriminator } from "./JtdDiscriminator.ts";
import { Forms } from "./_api.ts";
import { assertObjectMatch } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Basic Functionality", () => {
  type TestType = StaticDiscriminator<typeof TestType>;
  const TestType = Discriminator("test", {
    foo: {
      properties: {
        foo: Forms.Empty(),
      },
      optionalProperties: {},
      additionalProperties: false,
    },
    bar: {
      properties: { brightness: Forms.Type("int8") },
      optionalProperties: { height: Forms.Type("int16") },
      additionalProperties: false,
    },
  });

  assertObjectMatch(TestType, {
    discriminator: "test",
    mapping: {
      foo: {
        properties: { foo: {} },
        additionalProperties: false,
      },
      bar: {
        properties: { brightness: { type: "int8" } },
        optionalProperties: { height: { type: "int16" } },
        additionalProperties: false,
      },
    },
  });

  const _example: TestType = {
    test: "foo",
    foo: ["Anything goes here (it's an empty schema)"],
  };
  const _example2: TestType = {
    test: "bar",
    brightness: 123,
    height: 486,
  };
});
