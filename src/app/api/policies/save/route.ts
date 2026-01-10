import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import z from "zod";
import { getSecurityPolicesModel } from "@/src/models/securityPolices";
import { normalizeObjectId } from "@/src/lib/normalizeObjectId";

const schemaValidation = z.object({
  _id: z
    .string()
    .optional()
    .transform((id) => (id ? new ObjectId(id) : undefined)),
  access: z
    .array(z.string())
    .transform((access) => access.map((item) => new ObjectId(item))),
  active: z.boolean(),
  environment: z.string().transform((envirorment) => new ObjectId(envirorment)),
  name: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success, error, data } =
      await schemaValidation.safeParseAsync(body);
    if (!success) throw new Error(error.issues[0].message);

    const model = await getSecurityPolicesModel();
    const result = await model.upsert(
      {
        _id: new ObjectId(data._id),
      },
      {
        $set: {
          access: data.access,
          active: data.active,
          envirorment: data.environment,
          name: data.name,
        },
      },
    );

    return NextResponse.json({
      success: true,
      data: normalizeObjectId(result),
      message: "Política salvo com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
