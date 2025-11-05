import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat } from "@/data/dummyChats";
import { quickChatsDummy, type QuickChat } from "@/data/quickchat";
import { SendHorizontal, Info, ArrowLeft, CheckCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatInfoPanel } from "@/components/modules/ChatInfoPanel";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ChatWindowProps {
  chat: Chat | null;
  onStatusChange: (status: Chat["status"]) => void;
  onBack?: () => void;
}

export function ChatWindow({ chat, onStatusChange, onBack }: ChatWindowProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [input, setInput] = useState("");
  const [suggestedQuickChats, setSuggestedQuickChats] = useState<QuickChat[]>(
    []
  );

  // ✅ Load quick chat dari localStorage
  const [quickChats] = useState<QuickChat[]>(() => {
    const stored = localStorage.getItem("quickChats");
    return stored ? JSON.parse(stored) : quickChatsDummy;
  });

  // ✅ Load chat history dari localStorage
  const [localChats, setLocalChats] = useState<Record<number, Chat>>(() => {
    const stored = localStorage.getItem("chats");
    return stored ? JSON.parse(stored) : {};
  });

  // ✅ Sync ke localStorage setiap kali localChats berubah
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(localChats));
  }, [localChats]);

  // ✅ Update suggestions berdasarkan "/"
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    if (val.startsWith("/")) {
      const keyword = val.slice(1).toLowerCase(); // buang "/"
      const matches = quickChats.filter((q) =>
        q.title.toLowerCase().includes(keyword)
      );
      setSuggestedQuickChats(matches);
    } else {
      setSuggestedQuickChats([]);
    }
  };

  // ✅ Kirim pesan (user → message list + localStorage)
  const handleSendMessage = () => {
    if (!chat || !input.trim()) return;

    const newMessage: { from: "user" | "ai" | "human"; text: string } = {
      from: "human",
      text: input,
    };
    const updatedChat: Chat = {
      ...chat,
      messages: [...chat.messages, newMessage],
    };

    // Simpan ke state lokal & localStorage
    setLocalChats((prev) => ({
      ...prev,
      [chat.id]: updatedChat,
    }));

    setInput("");
    setSuggestedQuickChats([]);
  };

  // ✅ Tentukan data chat yang aktif (dari localStorage kalau ada)
  const currentChat = localChats[chat?.id || -1] || chat;

  if (!currentChat || !currentChat.messages) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Pilih chat di sebelah kiri
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Chat */}
      <div className="p-3 border-b bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <h3 className="font-semibold">{currentChat.name}</h3>
            <p className="text-sm text-gray-500">{currentChat.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onStatusChange("Resolved")}
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Resolve chat</TooltipContent>
          </Tooltip>

          <Button
            variant="outline"
            onClick={() => onStatusChange("Assigned to Human")}
          >
            Assign
          </Button>

          <Button
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-700"
            onClick={() => onStatusChange("Handled by AI")}
          >
            Unassign
          </Button>

          <div className="block xl:hidden">
            <Sheet open={isInfoOpen} onOpenChange={setIsInfoOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90vw] sm:w-[400px] p-0">
                <SheetHeader className="p-3 border-b">
                  <SheetTitle>Info Chat</SheetTitle>
                </SheetHeader>
                <div className="h-full overflow-y-auto">
                  <ChatInfoPanel chat={currentChat} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {currentChat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Belum ada pesan
          </div>
        ) : (
          currentChat.messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.from === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  m.from === "user"
                    ? "bg-white border text-gray-800"
                    : "bg-blue-500 text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex flex-col space-y-2">
        {suggestedQuickChats.length > 0 && (
          <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50 text-sm">
            {suggestedQuickChats.map((q) => (
              <div
                key={q.id}
                className="p-1 hover:bg-blue-100 rounded cursor-pointer"
                onClick={() => {
                  setInput(q.content);
                  setSuggestedQuickChats([]);
                }}
              >
                <strong>{q.title}</strong> — {q.content}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Ketik pesan..."
            className="flex-1"
            value={input}
            onChange={handleInputChange}
          />
          <Button variant="ghost" onClick={handleSendMessage}>
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
}
