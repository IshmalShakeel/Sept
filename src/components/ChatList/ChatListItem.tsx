import React from "react";
import type { Chat } from "../../types/chat";

interface ChatListItemProps {
  chat: Chat;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col overflow-hidden">
        {/* Chat Name */}
        <h4 className="text-sm font-semibold text-black truncate">
          {chat.name}
        </h4>

        {/* Last Message */}
        <p className="text-xs text-gray-700 truncate">
          {lastMessage?.text || "No messages yet"}
        </p>
      </div>

      {/* Time */}
      <small className="text-xs text-gray-600 ml-2 whitespace-nowrap">
        {lastMessage?.time}
      </small>
    </div>
  );
}
