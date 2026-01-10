import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import z from "zod";
import { getSecurityPolicesModel } from "@/src/models/securityPolices";
import { normalizeObjectId } from "@/src/lib/normalizeObjectId";

const schemaValidation = z.object({
  id: z
    .string()
    .refine((id) => ObjectId.isValid(id), {
      message: "ObjectId inválido",
    })
    .transform((id) => new ObjectId(id)),
});

export async function GET(
  _: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const { id } = await params;
    const parsed = schemaValidation.safeParse({
      id: id,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 403 },
      );
    }

    const model = await getSecurityPolicesModel();
    const response = await model.findOne({
      _id: parsed.data.id,
    });

    if (!response) throw new Error("Política de segurança não encontrada.");

    return NextResponse.json({
      success: true,
      data: normalizeObjectId(response),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
