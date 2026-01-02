import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const securityPolicesSchema = schema({
  name: types.string({ required: true, minLength: 2, maxLength: 50 }),
  active: types.boolean({ required: true }),
  envirorment: types.object(
    {
      name: types.string({ required: true }),
      active: types.boolean({ required: true }),
    },
    { required: true },
  ),
  access: types.array(types.objectId()),
});

export async function getSecurityPolicesModel() {
  const papr = await getPapr();
  const securityPolices = papr.model("securityPolices", securityPolicesSchema);
  return securityPolices;
}
