import { useState } from "react";
import { dummyChats, type Chat } from "@/data/dummyChats";
import { ChatList } from "@/components/modules/ChatList";
import { ChatWindow } from "@/components/modules/ChatWindow";

function Dashboard() {
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedChat = chats.find((c) => c.id === selectedId) || null;

    const handleSelectChat = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const handleStatusChange = (newStatus: Chat["status"]) => {
    if (!selectedChat) return;
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id ? { ...chat, status: newStatus } : chat
      )
    );
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Chat List */}
      <div className="w-1/3 border-r bg-white">
        <ChatList
          chats={chats}
          selectedId={selectedId}
          onSelect={handleSelectChat}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow chat={selectedChat} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}

export default Dashboard;
