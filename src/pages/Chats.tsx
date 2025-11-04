import { useState, useMemo, useEffect } from "react";
import { dummyChats, type Chat } from "@/data/dummyChats";
import { ChatSidebar } from "@/components/modules/ChatSidebar";
import { ChatWindow } from "@/components/modules/ChatWindow";
import { ChatInfoPanel } from "@/components/modules/ChatInfoPanel";
import { useSidebar } from "@/components/ui/sidebar";

function Chats() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [chats, setChats] = useState<Chat[]>(
    dummyChats.map((c) => ({ ...c, systemMessages: c.systemMessages ?? [] }))
  );
  const { state } = useSidebar();

  // ✅ Responsiveness: deteksi jika width < 1024
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedId) || null,
    [chats, selectedId]
  );

  const handleSelectChat = (id: number) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, unreadCount: 0 } : chat))
    );
    setSelectedId(id);
  };

  const handleBackToList = () => setSelectedId(null);

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


  return (
    <div className="w-full h-[90vh] flex flex-col">
      {/* 🔹 Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Mobile View (below 1024px): gantian tampilan */}
        {isMobile ? (
          selectedChat ? (
            <div className="flex-1 flex flex-col border-x bg-gray-50 relative">
              <ChatWindow
                chat={selectedChat}
                onStatusChange={handleStatusChange}
                onBack={isMobile ? handleBackToList : undefined}
              />
            </div>
          ) : (
            <div className="w-full h-full border-r">
              <ChatSidebar
                chats={chats}
                selectedId={selectedId}
                onSelect={handleSelectChat}
                globalSearch={searchQuery}
              />
            </div>
          )
        ) : (
          // ✅ Desktop View (≥1024px): 3 kolom normal
          <>
            <div className="w-full sm:w-1/3 lg:w-1/4 border-r">
              <ChatSidebar
                chats={chats}
                selectedId={selectedId}
                onSelect={handleSelectChat}
                globalSearch={searchQuery}
              />
            </div>

            <div
              className={`flex-1 border-x bg-gray-50 ${
                state === "expanded" ? "ml-4" : ""
              }`}
            >
              <ChatWindow
                chat={selectedChat}
                onStatusChange={handleStatusChange}
                onBack={isMobile ? handleBackToList : undefined}
              />
            </div>

            <div className="hidden xl:block xl:w-1/4 border-l">
              <ChatInfoPanel chat={selectedChat} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chats;
