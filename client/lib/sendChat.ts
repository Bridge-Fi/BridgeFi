import axios from "axios";

export async function sendChatWithRetry(sessionId: number, content: string) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const res = await axios.post("/api/chatbot/send", { sessionId, content });
      return res.data;
    } catch (err: any) {
      if (err.response?.status === 503) {
        attempt++;
        console.warn(`Retrying... attempt ${attempt}`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      } else {
        throw err;
      }
    }
  }

  throw new Error(
    "Gemini API is currently overloaded. Please try again later."
  );
}
