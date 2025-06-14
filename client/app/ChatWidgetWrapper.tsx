"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./chatbot/ChatWidget";

export function ChatWidgetWrapper() {
  const pathname = usePathname() ?? ""; // default to empty string if null

  const excludedPaths = ["/admin", "/login", "/sign-up"];
  const showChatWidget = !excludedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!showChatWidget) return null;

  return <ChatWidget />;
}
