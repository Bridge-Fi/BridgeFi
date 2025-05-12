// components/ChatWindow.tsx
import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function ChatWindow({ appointmentId, userRole }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = io(process.env.NEXT_PUBLIC_WS_URL);

  useEffect(() => {
    // Initial load
    fetch(`/api/messages/${appointmentId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Socket setup
    socket.on("connect", () => {
      socket.emit("joinAppointment", appointmentId);
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev: any[]) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [appointmentId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        appointmentId,
        sender: userRole,
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.message}</p>
            <span>{new Date(msg.sent_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
