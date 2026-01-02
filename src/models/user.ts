import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const usersSchema = schema(
  {
    name: types.string({ required: true }),
    cpf: types.string({ required: true, minLength: 11, maxLength: 11 }),
    cel: types.string({ required: true, minLength: 11, maxLength: 11 }),
    email: types.string({ required: true, minLength: 7, maxLength: 200 }),
    password: types.string({ required: true, minLength: 3, maxLength: 500 }),
    active: types.boolean({ required: true }),
    envirorment: types.array(types.objectId({ required: true })),
    securityPolicy: types.array(types.objectId({ required: true })),
    endereco: types.objectId({ required: true }),
    code: types.objectId({ required: false, minLength: 6, maxLength: 6 }),
    needUpdatePassword: types.boolean({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      active: true,
      needUpdatePassword: true,
    },
  },
);

export async function getUsersModel() {
  const papr = await getPapr();
  const users = papr.model("users", usersSchema);
  return users;
}
