import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const clientsSchema = schema(
  {
    name: types.string({ required: true }),
    fantasia: types.string({ required: false }),
    type: types.string({ required: true, enum: ["PF", "PJ"] }),
    cpfCnpj: types.string({ required: true, minLength: 11, maxLength: 14 }),
    rgIe: types.string({ required: false }),
    cell: types.string({ required: false, minLength: 11, maxLength: 11 }),
    tel: types.string({ required: false, minLength: 10, maxLength: 10 }),
    active: types.boolean({ required: true }),
    endereco: types.objectId({ required: true }),
  },
  {
    timestamps: true,
  },
);

export async function getClientModel() {
  const papr = await getPapr();
  const clients = papr.model("clients", clientsSchema);
  return clients;
}
