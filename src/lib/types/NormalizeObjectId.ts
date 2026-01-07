import { ObjectId } from "mongodb";

export type NormalizeObjectId<T> = T extends Date
  ? Date
  : T extends ObjectId
    ? string
    : T extends Array<infer U>
      ? NormalizeObjectId<U>[]
      : T extends object
        ? { [K in keyof T]: NormalizeObjectId<T[K]> }
        : T;
