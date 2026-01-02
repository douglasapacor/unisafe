import Papr from "papr";
import { getMongoClient } from "./mongo/client";

declare global {
  var _papr: Papr | undefined;
}

export async function getPapr(): Promise<Papr> {
  if (global._papr) {
    return global._papr;
  }

  const client = await getMongoClient();
  const db = client.db("dev-db");

  const papr = new Papr();
  papr.initialize(db);

  global._papr = papr;

  return papr;
}
