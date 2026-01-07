import { ObjectId } from "mongodb";
import { NormalizeObjectId } from "./types/NormalizeObjectId";

export function normalizeObjectId<T>(value: T): NormalizeObjectId<T> {
  if (value instanceof ObjectId) {
    return value.toString() as NormalizeObjectId<T>;
  }

  if (value instanceof Date) {
    return value as NormalizeObjectId<T>;
  }

  if (Array.isArray(value)) {
    return value.map((v) => normalizeObjectId(v)) as NormalizeObjectId<T>;
  }

  if (value && typeof value === "object") {
    const result = {} as {
      [K in keyof T]: NormalizeObjectId<T[K]>;
    };

    for (const key in value) {
      result[key] = normalizeObjectId(value[key]);
    }

    return result as NormalizeObjectId<T>;
  }

  return value as NormalizeObjectId<T>;
}
