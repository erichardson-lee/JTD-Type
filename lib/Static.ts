import { JtdEmpty, StaticEmpty } from "./forms/JtdEmpty.ts";
import { JtdRef, StaticRef } from "./forms/JtdRef.ts";
import { JtdType, StaticType } from "./forms/JtdType.ts";
import { JtdEnum, StaticEnum } from "./forms/JtdEnum.ts";
import { JtdProperties, StaticProperties } from "./forms/JtdProperties.ts";
import { Invalid } from "./forms/_api.ts";
import {
  JtdDiscriminator,
  StaticDiscriminator,
} from "./forms/JtdDiscriminator.ts";
import { JtdSchema } from "./index.ts";

export type Static<T extends JtdSchema | undefined> = T extends JtdSchema ? 
    | (T extends { nullable: true } ? null : never)
    | (T extends JtdEmpty ? StaticEmpty<T>
      : T extends JtdRef ? StaticRef<T>
      : T extends JtdType ? StaticType<T>
      : T extends JtdEnum ? StaticEnum<T>
      : T extends JtdProperties ? StaticProperties<T>
      : T extends JtdDiscriminator ? StaticDiscriminator<T>
      : Invalid<"Unsupported Schema Type", T>)
  : undefined;
