import React from "react";

export default function Tabs() {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      {/* One-on-One Tab */}
      <button className="px-4 py-2 text-sm font-medium text-black border-b-2 border-black focus:outline-none">
        One-on-One
      </button>

      {/* Group Chats Tab */}
      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:border-black border-b-2 border-transparent focus:outline-none transition-colors">
        Group Chats
      </button>
    </div>
  );
}
