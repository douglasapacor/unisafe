import { schema, types } from "papr";
import { getPapr } from "../lib/papr";

const workSchedulesSchema = schema({
  name: types.string({ required: true }),
});

export async function getWorkScheduleModel() {
  const papr = await getPapr();
  const workSchedules = papr.model("workSchedules", workSchedulesSchema);
  return workSchedules;
}
