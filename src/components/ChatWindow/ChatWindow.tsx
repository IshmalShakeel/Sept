import React, { useEffect, useState } from "react";
import type { Chat, Message } from "../../types/chat";

interface ChatWindowProps {
  chat: Chat | null;
}

export default function ChatWindow({ chat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(chat?.messages || []);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Select a chat to view messages
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-300">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
        {chat.name}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-xs ${
              msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm ${
                msg.sender === "me"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
            <small className="text-xs text-gray-400 mt-1">{msg.time}</small>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center border-t border-gray-200 p-3">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
