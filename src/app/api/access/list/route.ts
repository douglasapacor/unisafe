import getAccessList from "@/src/repository/getAccessList";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schemaValidation = z.object({
  page: z.string().transform((page) => +page),
  limit: z.string().transform((limit) => +limit),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const { success, error, data } = await schemaValidation.safeParseAsync({
      page,
      limit,
    });

    if (!success) throw new Error(error.issues[0].message);

    const content = await getAccessList(data);

    return NextResponse.json({
      success: true,
      data: content,
      message: "",
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
