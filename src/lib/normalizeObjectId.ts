import { ObjectId } from "mongodb";
import { NormalizeObjectId } from "./types/NormalizeObjectId";

export function normalizeObjectId<T>(value: T): NormalizeObjectId<T> {
  if (value instanceof ObjectId) {
    return value.toString() as any;
  }

  if (Array.isArray(value)) {
    return value.map(normalizeObjectId) as any;
  }

  if (value && typeof value === "object") {
    const result: any = {};

    for (const [key, val] of Object.entries(value)) {
      result[key] = normalizeObjectId(val);
    }
    return result;
  }

  return value as any;
}
