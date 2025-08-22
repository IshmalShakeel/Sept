import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import Calendar from "./components/Calendar/Calendar";
import type { Chat } from "./types/chat";

export default function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation */}
        <Topbar />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-1 justify-center items-center">
                <button
                  onClick={() => navigate("/streamline")}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Streamline
                </button>
              </div>
            }
          />

          {/* Chat Page */}
          <Route
            path="/chats"
            element={
              <div className="flex flex-1 overflow-hidden">
                {/* Left Panel */}
                <div className="w-1/3 border-r border-gray-300 flex flex-col">
                  <SearchBar onSearch={setSearchQuery} />
                  <Tabs />
                  <div className="flex-1 overflow-y-auto">
                    <ChatList
                      onSelectChat={setSelectedChat}
                      searchQuery={searchQuery}
                    />
                  </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 overflow-y-auto">
                  <ChatWindow chat={selectedChat} />
                </div>
              </div>
            }
          />

          {/* Calendar Page */}
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}
