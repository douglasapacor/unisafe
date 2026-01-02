import { schema, types } from "papr";
import { getPapr } from "../lib/papr";

const operatorsSchema = schema({
  name: types.string({ required: true }),
});

export async function getOperatorsModel() {
  const papr = await getPapr();
  const operators = papr.model("operators", operatorsSchema);
  return operators;
}
