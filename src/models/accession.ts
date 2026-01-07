import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const accessionsSchema = schema(
  {
    client: types.objectId({ required: true }),
    content: types.array(
      types.object({
        active: types.boolean({ required: true }),
        product: types.objectId({ required: true }),
        accessiontype: types.string({ enum: ["month", "signature"] }),
        validity: types.object(
          {
            start: types.date({ required: false }),
            end: types.date({ required: false }),
          },
          { required: false },
        ),
        priceVariations: types.array(
          types.object({
            order: types.number(),
            value: types.decimal(),
            type: types.string({ enum: ["acrescimo", "desconto"] }),
            mode: types.string({ enum: ["percentual", "direto"] }),
            createdAt: types.date(),
            createdBy: types.objectId(),
          }),
        ),
      }),
    ),
    active: types.boolean({ required: true }),
    billingDate: types.date({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      content: [],
      active: true,
    },
  },
);

export async function getAccessionsModel() {
  const papr = await getPapr();
  const accessions = papr.model("accessions", accessionsSchema);
  return accessions;
}
