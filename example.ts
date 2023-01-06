import { Forms, Static } from "https://deno.land/x/jtd_type/mod.ts";

type UserInfo = Static<typeof UserInfo>;
const UserInfo = Forms.Properties({
  properties: {
    name: Forms.Type("string"),
  },
  optionalProperties: {
    nickname: Forms.Type("string"),
    customFields: Forms.Empty(),
  },
  additionalProperties: false,
});

const print = (d: unknown) => console.log(JSON.stringify(d, undefined, 2));

const fred: UserInfo = {
  name: "Frederick",
  nickname: "Fred",
  customFields: {
    foo: "bar",
  },
};

print(UserInfo); // Log the Data type
print(fred); // Log the Data
