import { getEnvirormentModel } from "@/src/models/envirorment";

export async function seed() {
  try {
    const envirormentModel = await getEnvirormentModel();
    const verifyEnvirorment = await envirormentModel.find({});

    if (verifyEnvirorment.length <= 0) {
      await envirormentModel.insertMany([
        {
          name: "Adminstração",
          active: true,
        },
        {
          name: "Operação",
          active: true,
        },
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

seed();
