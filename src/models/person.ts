import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const personSchema = schema(
  {
    name: types.string({ required: true }),
    birthdate: types.date({ required: false }),
    gender: types.string({ required: false }),
    cpf: types.string({ required: true, minLength: 11, maxLength: 11 }),
    rg: types.string({ required: false, minLength: 9, maxLength: 9 }),
    cel: types.string({ required: false, minLength: 11, maxLength: 11 }),
    email: types.string({ required: true, minLength: 7, maxLength: 200 }),
    adress: types.objectId({ required: false }),
    active: types.boolean({ required: true }),
    photo: types.string({ required: false }),
  },
  {
    timestamps: true,
    defaults: {},
  },
);

export async function getPersonModel() {
  const papr = await getPapr();
  const person = papr.model("person", personSchema);
  return person;
}
