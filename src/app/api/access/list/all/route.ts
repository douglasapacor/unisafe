import { getAccessModel } from "@/src/models/access";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
  try {
    const accessModel = await getAccessModel();
    const allItems = await accessModel.find(
      {
        active: true,
      },
      {
        projection: {
          _id: 1,
          name: 1,
        },
      },
    );
    const data = allItems.map((item) => ({
      label: item.name,
      value: item._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      data,
      message: "",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
