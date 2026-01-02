import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const envirormentsSchema = schema({
  name: types.string({ required: true }),
  active: types.boolean({ required: true }),
});

export async function getEnvirormentModel() {
  const papr = await getPapr();
  const envirorments = papr.model("envirorments", envirormentsSchema);
  return envirorments;
}
