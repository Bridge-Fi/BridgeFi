import axios from "axios";

export const sendChat = async (sessionId: number, message: string) => {
  const res = await axios.post("/api/chatbot/send", {
    sessionId,
    content: message,
  });
  return res.data;
};
