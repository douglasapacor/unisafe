import { getPapr } from "@/src/lib/papr";
import { schema, types } from "papr";

const usersSchema = schema(
  {
    person: types.objectId({ required: true }),
    password: types.string({ required: true, minLength: 3, maxLength: 500 }),
    envirorment: types.objectId({ required: true }),
    securityPolicy: types.array(types.objectId({ required: true })),
    confirmationCode: types.objectId({
      required: false,
      minLength: 6,
      maxLength: 6,
    }),
    active: types.boolean({ required: true }),
    needUpdatePassword: types.boolean({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      active: true,
      needUpdatePassword: false,
    },
  },
);

export async function getUsersModel() {
  const papr = await getPapr();
  const users = papr.model("users", usersSchema);
  return users;
}
