import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-gray-200 text-black font-medium"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-black">TBD</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-6">
        {/* General Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            General
          </h4>
          <ul className="space-y-1">
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/streamline")}`}
              onClick={() => navigate("/streamline")}
            >
              Streamline
            </li>
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/subjects")}`}
              onClick={() => navigate("/subjects")}
            >
     
              Subjects
            </li>
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/issues")}`}
              onClick={() => navigate("/issues")}
            >
              Issues
            </li>
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/calendar")}`}
              onClick={() => navigate("/calendar")}
            >
              Calendar
            </li>
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/chats")}`}
              onClick={() => navigate("/chats")}
            >
              Chats
            </li>
          </ul>
        </div>

        {/* Vital Section */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Vital
          </h4>
          <ul className="space-y-1">
            <li
              className={`px-3 py-2 rounded-lg cursor-pointer ${isActive("/clock")}`}
              onClick={() => navigate("/clock")}
            >
              Clock-in / Clock-out
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200">
          Settings
        </button>
        <button className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200">
          Collapse
        </button>
      </div>
    </div>
  );
}
