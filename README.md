# Jtd Type

This library is designed to be a
[Typebox](https://github.com/sinclairzx81/typebox) style schema creator for
generation of [RFC8927](https://www.rfc-editor.org/rfc/rfc8927) compliant Json
Type Definition schemas.

## Usage

```ts
import { Forms, Static } from "https://deno.land/x/jtd_type/mod.ts";

const UserInfo = Forms.Properties({
  properties: {
    name: Forms.Type("string"),
  },
  optionalProperties: {
    nickname: Forms.Type("string"),
    // Note: Empty allows for any value
    customFields: Forms.Empty(),
  },
  additionalProperties: false,
});
type UserInfo = Static<typeof UserInfo>;

// User info can now be used as a value to refer to the schema,
// or as a type to refer to a compliant data structure.

const fred: UserInfo = {
  name: "Frederick",
  nickname: "Fred",
  customFields: {
    foo: "bar",
  },
};

const print = (d: unknown) => console.log(JSON.stringify(d, undefined, 2));

print(UserInfo); // Log the Data type
print(fred); // Log the Data
```
