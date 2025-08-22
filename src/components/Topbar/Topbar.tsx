import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/calendar":
        return "Calendar";
      case "/chats":
        return "Chat List";
      case "/":
        return "Streamline Home";
      default:
        return "Manage Chats";
    }
  };

  const showNewChatButton = location.pathname === "/chats";
  //const showNewEvent = location.pathname === "/calendar";

  const handleNewChat = () => {
    alert("New Chat button clicked!");
  };



  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{getTitle()}</h3>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {showNewChatButton && (
          <button
            onClick={handleNewChat}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            + Start New Chat
          </button>
        )}

        {/* Icons */}
        <div className="flex items-center space-x-3 text-xl">
          <span className="cursor-pointer hover:text-black transition-colors">🔔</span>
          <span className="cursor-pointer hover:text-black transition-colors">👤</span>
        </div>
      </div>
    </div>
  );
}
