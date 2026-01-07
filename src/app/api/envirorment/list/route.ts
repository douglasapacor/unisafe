import { normalizeObjectId } from "@/src/lib/normalizeObjectId";
import { getEnvirormentModel } from "@/src/models/envirorment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  try {
    const envirormentModel = await getEnvirormentModel();

    const result = await envirormentModel.find({
      active: true,
    });

    return NextResponse.json({
      success: true,
      data: normalizeObjectId(result),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
