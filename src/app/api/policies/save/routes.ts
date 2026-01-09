import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import z from "zod";

const schemaValidation = z.object({
  _id: z
    .string()
    .optional()
    .transform((id) => (id ? new ObjectId(id) : undefined)),
});

export default async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success, error, data } =
      await schemaValidation.safeParseAsync(body);
    if (!success) throw new Error(error.issues[0].message);

    return NextResponse.json({
      success: true,
      data: {},
      message: "Política salvo com sucesso.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
