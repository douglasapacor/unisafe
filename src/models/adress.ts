import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const adressSchema = schema(
  {
    cep: types.string({ required: true }),
    rua: types.string({ required: true }),
    numero: types.string({ required: true }),
    bairro: types.string({ required: true }),
    cidade: types.string({ required: true }),
    estado: types.string({ required: true }),
    complemento: types.string({ required: false }),
  },
  {
    timestamps: true,
  },
);

export async function getAdressModel() {
  const papr = await getPapr();
  const adress = papr.model("adress", adressSchema);
  return adress;
}
