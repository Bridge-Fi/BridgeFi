// client/app/api/chatbot/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { sessionId, content } = await req.json();

  try {
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chatbot/send`,
      { sessionId, content },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err: any) {
    console.error("Send proxy error:", err.response?.data || err.message);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: "Internal error" };
    return NextResponse.json(data, { status });
  }
}
