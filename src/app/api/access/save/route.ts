import { getAccessModel } from "@/src/models/access";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import z from "zod";

const schemaValidation = z.object({
  _id: z
    .string()
    .optional()
    .transform((id) => (id ? new ObjectId(id) : undefined)),
  name: z.string(),
  tag: z.string(),
  path: z.string(),
  icon: z.string(),
  active: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success, error, data } =
      await schemaValidation.safeParseAsync(body);
    if (!success) throw new Error(error.issues[0].message);

    const model = await getAccessModel();

    const exist = await model.countDocuments({ name: data.name });

    if (exist > 0) {
      throw new Error(
        "Já existe um acesso com esse nome. Por favor escolha outro.",
      );
    }

    let finalID = "";

    if (data._id) {
      await model.updateOne(
        {
          _id: new ObjectId(data._id),
        },
        {
          $set: {
            name: data.name,
            active: data.active,
            icon: data.icon,
            path: data.path,
            tag: data.tag,
          },
        },
      );

      finalID = data._id.toString();
    } else {
      const insertResponse = await model.insertOne({
        name: data.name,
        active: data.active,
        icon: data.icon,
        path: data.path,
        tag: data.tag,
      });

      finalID = insertResponse._id.toString();
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: finalID,
      },
      message: "Acesso salvo com sucesso.",
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
