import { normalizeObjectId } from "@/src/lib/normalizeObjectId";
import { getAccessModel } from "@/src/models/access";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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
        { status: 400 },
      );
    }

    const model = await getAccessModel();
    const access = await model.findById(parsed.data.id);

    if (!access) {
      return NextResponse.json({
        success: true,
        message: "Nenhum acesso encontrado.",
      });
    } else {
      return NextResponse.json({
        success: true,
        data: normalizeObjectId(access),
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
