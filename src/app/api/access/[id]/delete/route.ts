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

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
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

    const model = await getAccessModel();
    await model.deleteOne({ _id: parsed.data.id });

    return NextResponse.json({
      success: true,
      data: { deletedId: id },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
