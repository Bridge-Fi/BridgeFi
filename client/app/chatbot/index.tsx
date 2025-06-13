// apps/frontend/pages/chat.tsx
import React from "react";
import { ChatWindow } from "./ChatWindow";

export default function ChatPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md h-3/4">
        <ChatWindow />
      </div>
    </div>
  );
}
