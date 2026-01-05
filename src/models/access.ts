import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const accessSchema = schema(
  {
    name: types.string({ required: true, minLength: 2, maxLength: 50 }),
    tag: types.string({ required: true, minLength: 5, maxLength: 5 }),
    path: types.string({ required: true, minLength: 2, maxLength: 200 }),
    icon: types.string({ required: true, minLength: 1, maxLength: 30 }),
    active: types.boolean({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      active: true,
    },
  },
);

export async function getAccessModel() {
  const papr = await getPapr();
  const access = papr.model("access", accessSchema);
  return access;
}
