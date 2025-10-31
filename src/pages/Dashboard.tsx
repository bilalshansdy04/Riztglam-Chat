import { useState } from "react";
import { dummyChats, type Chat } from "@/data/dummyChats";
import { HeaderBar } from "@/components/modules/HeaderBar";
import { ChatSidebar } from "@/components/modules/ChatSideBar";
import { ChatWindow } from "@/components/modules/ChatWindow";
import { ChatInfoPanel } from "@/components/modules/ChatInfoPanel";

function Dashboard() {
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedChat = chats.find((c) => c.id === selectedId) || null;

  const handleStatusChange = (newStatus: Chat["status"]) => {
    if (!selectedChat) return;

    // Tentukan pesan sistem
    let systemMsg = "";
    if (newStatus === "Assigned to Human") systemMsg = "🧠 Chat assigned to Human";
    if (newStatus === "Handled by AI") systemMsg = "🤖 Chat returned to AI";
    if (newStatus === "Resolved") systemMsg = "✅ Chat resolved by Human";

    // Update hanya untuk chat yang sedang dipilih
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              status: newStatus,
              systemMessages: [
                ...(chat.systemMessages || []),
                `${systemMsg} • ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
              ],
            }
          : chat
      )
    );
  };

  const handleResolve = () => {
    handleStatusChange("Resolved");
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderBar
        onResolve={handleResolve}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedChatName={selectedChat?.name || null}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4">
          <ChatSidebar
            chats={chats}
            selectedId={selectedId}
            onSelect={setSelectedId}
            globalSearch={searchQuery}
          />
        </div>
        <div className="flex-1 border-x bg-gray-50">
          <ChatWindow
            chat={selectedChat}
            onStatusChange={handleStatusChange}
          />
        </div>
        <div className="w-1/4">
          <ChatInfoPanel chat={selectedChat} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
