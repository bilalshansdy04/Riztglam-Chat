import { Home, MessageCircle, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MobileSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chats", label: "All Chats", icon: MessageCircle },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-2 p-3 border-b">
        <Bot className="w-5 h-5 text-blue-600" />
        <h2 className="font-semibold text-lg">Ritzglam Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to}>
            <div
              className={`flex items-center px-4 py-3 gap-2 border-b cursor-pointer transition ${
                location.pathname === to
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-3 border-t text-center text-gray-500 text-sm">
        v1.0.0
      </div>
    </div>
  );
}
