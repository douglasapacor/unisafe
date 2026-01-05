import { ObjectId } from "mongodb";

export type NormalizeObjectId<T> = T extends ObjectId
  ? string
  : T extends Date
    ? Date
    : T extends Array<infer U>
      ? NormalizeObjectId<U>[]
      : T extends object
        ? { [K in keyof T]: NormalizeObjectId<T[K]> }
        : T;
