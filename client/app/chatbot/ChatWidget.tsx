// components/ChatWidget.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChatWindow } from "./ChatWindow";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [persistedMessages, setPersistedMessages] = useState<
    { text: string; fromUser: boolean }[]
  >([]);
  const chatWidgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(true);
    setInitialized(true);
    // Initialize with welcome message only if no persisted messages
    if (persistedMessages.length === 0) {
      setPersistedMessages([
        {
          text: "Hello there! I am your Bridge-Fi chatbot, how can I assist you today?",
          fromUser: false,
        },
      ]);
    }
  }, []);

  // Handle clicking outside to close chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWidgetRef.current &&
        !chatWidgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMessagesUpdate = (
    newMessages: { text: string; fromUser: boolean }[]
  ) => {
    setPersistedMessages(newMessages);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={chatWidgetRef}>
      <div
        className={`flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300 ${
          isOpen ? "h-[36rem] w-[28rem]" : "h-12 w-48"
        }`}
        style={{
          maxHeight: "calc(100vh - 2rem)", // Ensure it doesn't exceed viewport height
        }}
      >
        <div
          className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 cursor-pointer shrink-0"
          onClick={() => setIsOpen((o) => !o)}
        >
          <span className="font-semibold">Bridge-Fi Chat</span>
          <span className="text-lg">{isOpen ? "−" : "+"}</span>
        </div>
        {isOpen && (
          <div className="flex-1 min-h-0">
            <ChatWindow
              key="chat-window" // Add key to prevent remounting issues
              initialMessages={persistedMessages}
              onMessagesChange={handleMessagesUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};
