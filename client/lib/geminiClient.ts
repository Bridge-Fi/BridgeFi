import axios from "axios";

export async function sendChat(
  sessionId: string,
  text: string
): Promise<{ text: string }> {
  const res = await axios.post(
    "/api/chatbot/send",
    { sessionId, content: text },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data; // expects { text: string }
}
