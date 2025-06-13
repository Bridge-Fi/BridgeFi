import React, { JSX } from "react";

type Props = {
  text: string;
  fromUser: boolean;
};

export const MessageBubble: React.FC<Props> = ({ text, fromUser }) => {
  // Function to format text with bullet points and clickable links
  const formatText = (text: string) => {
    // Split text into lines
    const lines = text.split("\n");
    const formattedLines: JSX.Element[] = [];

    lines.forEach((line, index) => {
      // Check if line starts with a number (1., 2., etc.) or bullet point
      const numberedListMatch = line.match(/^(\d+)\.\s*(.+)/);
      const bulletMatch = line.match(/^[•·*-]\s*(.+)/);

      if (numberedListMatch) {
        // Convert numbered list to bullet point
        const content = numberedListMatch[2];
        formattedLines.push(
          <div key={index} className="flex items-start mb-1">
            <span className="mr-2 mt-1">•</span>
            <span>{formatLinksInText(content)}</span>
          </div>
        );
      } else if (bulletMatch) {
        // Already a bullet point
        const content = bulletMatch[1];
        formattedLines.push(
          <div key={index} className="flex items-start mb-1">
            <span className="mr-2 mt-1">•</span>
            <span>{formatLinksInText(content)}</span>
          </div>
        );
      } else if (line.trim()) {
        // Regular text line
        formattedLines.push(
          <div key={index} className="mb-1">
            {formatLinksInText(line)}
          </div>
        );
      }
    });

    return formattedLines;
  };

  // Function to make URLs clickable
  const formatLinksInText = (text: string) => {
    // URL regex pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline hover:opacity-80 ${
              fromUser ? "text-blue-100" : "text-blue-600"
            }`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex ${fromUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs lg:max-w-sm p-3 rounded-2xl ${
          fromUser
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-gray-200 text-gray-800 rounded-bl-sm"
        }`}
      >
        <div className="text-sm leading-relaxed">{formatText(text)}</div>
      </div>
    </div>
  );
};
