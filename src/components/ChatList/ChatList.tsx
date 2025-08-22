import React from "react";
import ChatListItem from "./ChatListItem";
import type { Chat } from "../../types/chat";

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
  searchQuery: string;
}

export default function ChatList({ onSelectChat, searchQuery }: ChatListProps) {
  const chats: Chat[] = [
    {
      name: "John Smith & Josh",
      messages: [
        { sender: "other", text: "I'll send the report by EOD", time: "12:45 PM" },
        { sender: "me", text: "Thanks! I'll review it.", time: "12:47 PM" },
      ],
    },
    {
      name: "Alice Johnson",
      messages: [
        { sender: "other", text: "The design mockups are ready for", time: "1:15 PM" },
        { sender: "me", text: "Great, let's schedule a review.", time: "1:20 PM" },
      ],
    },
    {
      name: "Michael Brown",
      messages: [
        { sender: "other", text: "Let's schedule a call to discuss the", time: "2:30 PM" },
      ],
    },
    {
      name: "Adam Davis",
      messages: [
        { sender: "other", text: "I've completed the user testing", time: "3:00 PM" },
      ],
    },
    {
      name: "Josh Davis",
      messages: [
        { sender: "other", text: "I've completed the user testing", time: "3:00 PM" },
      ],
    },
  ];

  // Filter chats by name (case insensitive)
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y divide-gray-200 bg-white">
      {filteredChats.map((chat, index) => (
        <div
          key={index}
          onClick={() => onSelectChat(chat)}
          className="cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <ChatListItem chat={chat} />
        </div>
      ))}
    </div>
  );
}
