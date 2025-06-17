"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "./ui/input";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you navigate your immigration journey. What questions do you have?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("lawyer") || lowerInput.includes("attorney")) {
      return "I can help you find immigration lawyers! Visit our lawyer directory where you can filter by specialization, location, and experience. Would you like me to guide you there?";
    }

    if (
      lowerInput.includes("job") ||
      lowerInput.includes("employer") ||
      lowerInput.includes("h1b")
    ) {
      return "Looking for employment opportunities? Check out our Employer Hub where companies post jobs with visa sponsorship. Many offer H1B, L1, and other work visas.";
    }

    if (
      lowerInput.includes("cost") ||
      lowerInput.includes("money") ||
      lowerInput.includes("financial")
    ) {
      return "Immigration costs can vary widely. Our Financial Resources page has information about typical costs, banks that work with immigrants, and potential funding sources. What specific financial aspect are you curious about?";
    }

    if (
      lowerInput.includes("green card") ||
      lowerInput.includes("permanent resident")
    ) {
      return "There are several paths to a green card including family-based, employment-based (EB-1, EB-2, EB-3), and special categories. The best path depends on your situation. Would you like to speak with a lawyer to discuss your options?";
    }

    return "That's a great question! For detailed immigration advice, I'd recommend connecting with one of our vetted immigration attorneys. They can provide personalized guidance for your specific situation. Would you like me to help you find a lawyer?";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Immigration Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  message.isBot
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
            placeholder="Ask about immigration..."
            onKeyPress={(e: any) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
