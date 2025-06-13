// client/app/api/chatbot/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/session`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err: any) {
    console.error("Session proxy error:", err.response?.data || err.message);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: "Unable to create session" };
    return NextResponse.json(data, { status });
  }
}
