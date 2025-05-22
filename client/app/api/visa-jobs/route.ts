import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const visa = searchParams.get("visa") ?? "";
  const page = searchParams.get("page") ?? "1";

  try {
    const { data } = await axios.get("http://localhost:3001/api/visa-jobs", {
      params: { visa, page },
    });
    console.log("Fetched jobs:", data);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Next.js proxy error:", err.response?.data || err.message);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: err.response?.status || 500 }
    );
  }
}
