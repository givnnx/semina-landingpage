import { NextResponse } from "next/server";
import { getData } from "@/utils/fetchData";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const res = await getData("api/v1/cron/keep-warm");

  return NextResponse.json({
    success: true,
    message: "Triggered database keep-warm ping to backend",
    backendResponse: res,
    timestamp: new Date().toISOString(),
  });
}
