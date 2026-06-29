import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { searchParams } = new URL(request.url);
  const fields = searchParams.get("fields");

  return NextResponse.json(
    {
      message: "Success",
      fields,
      targetId: id,
    },
    { status: 200, headers: { "X-Custom-Header": "random" } },
  );
}
