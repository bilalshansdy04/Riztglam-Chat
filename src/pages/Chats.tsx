import { useState, useMemo } from "react";
import { dummyChats, type Chat } from "@/data/dummyChats";
import { ChatSidebar } from "@/components/modules/ChatSidebar";
import { HeaderBar } from "@/components/modules/HeaderBar";
import { ChatWindow } from "@/components/modules/ChatWindow";
import { ChatInfoPanel } from "@/components/modules/ChatInfoPanel";

function Chats() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<Chat[]>(
    dummyChats.map((c) => ({ ...c, systemMessages: c.systemMessages ?? [] }))
  );

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedId) || null,
    [chats, selectedId]
  );

  const handleSelectChat = (id: number) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleStatusChange = (newStatus: Chat["status"]) => {
    if (!selectedChat) return;

    let systemMsg = "";
    if (newStatus === "Assigned to Human")
      systemMsg = "🧠 Chat assigned to Human";
    if (newStatus === "Handled by AI") systemMsg = "🤖 Chat returned to AI";
    if (newStatus === "Resolved") systemMsg = "✅ Chat resolved by Human";

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              status: newStatus,
              systemMessages: [
                ...(chat.systemMessages || []),
                `${systemMsg} • ${new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`,
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
    <div className="w-full">
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
              onSelect={handleSelectChat}
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
    </div>
  );
}

export default Chats;
