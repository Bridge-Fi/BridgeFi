// apps/frontend/pages/ChatWindow.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageBubble } from "./MessageBubble";
import { sendChat } from "../../lib/geminiClient";

interface ChatWindowProps {
  initialMessages?: { text: string; fromUser: boolean }[];
  onMessagesChange?: (messages: { text: string; fromUser: boolean }[]) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  initialMessages = [],
  onMessagesChange,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize messages with initial messages on mount
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages.length]);

  // Notify parent component when messages change
  useEffect(() => {
    if (onMessagesChange && messages.length > 0) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  // 1) Create a session via axios
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          "/api/chatbot/session",
          {},
          { withCredentials: true }
        );
        // coerce to number
        setSessionId(Number(res.data.sessionId));
      } catch (err) {
        console.error("Session creation failed:", err);
      }
    })();
  }, []);

  // auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessageToState = (msg: { text: string; fromUser: boolean }) => {
    setMessages((m) => [...m, msg]);
  };

  // 2) Send user input and get bot reply
  const handleSend = async () => {
    if (!input.trim() || sessionId === null || isLoading) return;

    const userMessage = input.trim();
    addMessageToState({ text: userMessage, fromUser: true });
    setInput("");
    setIsLoading(true);

    try {
      const { text: botText } = await sendChat(`${sessionId}`, userMessage);
      addMessageToState({ text: botText, fromUser: false });
    } catch (error) {
      console.error("Chat error:", error);
      addMessageToState({
        text: "⚠️ Sorry, I encountered an error. Please try again.",
        fromUser: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages area with proper scrolling */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1 min-h-0">
        <div className="space-y-1">
          {messages.map((m, i) => (
            <MessageBubble key={i} text={m.text} fromUser={m.fromUser} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-2xl rounded-bl-sm max-w-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input area with better styling */}
      <div className="p-4 border-t bg-white shrink-0">
        <div className="flex items-center space-x-2">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              sessionId === null ? "Initializing…" : "Type your question…"
            }
            disabled={sessionId === null || isLoading}
          />
          <button
            className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleSend}
            disabled={sessionId === null || isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
