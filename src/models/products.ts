import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const productsSchema = schema(
  {
    name: types.string({ required: true }),
    active: types.boolean({ required: true }),
    value: types.decimal({ required: true }),
    securityPolicy: types.objectId({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      active: true,
    },
  },
);

export async function getProductModel() {
  const papr = await getPapr();
  const products = papr.model("products", productsSchema);
  return products;
}
