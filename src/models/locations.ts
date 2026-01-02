import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const locationSchema = schema({
  name: types.string({ required: true }),
  client: types.objectId({ required: true }),
  adress: types.objectId({ required: true }),
  active: types.boolean({ required: true }),
  access: types.array(
    types.object({
      name: types.string({ required: true }),
      type: types.string({ required: true }),
    }),
  ),
});

export async function getLocationsModel() {
  const papr = await getPapr();
  const location = papr.model("location", locationSchema);
  return location;
}
