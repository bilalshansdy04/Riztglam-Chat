import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat } from "@/data/dummyChats";
import { SendHorizontal, Info, ArrowLeft, CheckCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatInfoPanel } from "@/components/modules/ChatInfoPanel";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ChatWindowProps {
  chat: Chat | null;
  onStatusChange: (status: Chat["status"]) => void;
  onBack?: () => void;
}

export function ChatWindow({ chat, onStatusChange, onBack }: ChatWindowProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (!chat || !chat.messages) {
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
          {/* Tombol Back (mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-sm text-gray-500">{chat.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 🔹 Tombol Resolve dengan Tooltip */}
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
          {/* Tombol Assign */}
          <Button
            variant="outline"
            onClick={() => onStatusChange("Assigned to Human")}
          >
            Assign
          </Button>

          {/* Tombol Unassign */}
          <Button
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-700"
            onClick={() => onStatusChange("Handled by AI")}
          >
            Unassign
          </Button>


          {/* Tombol Info (hanya tampil jika layar < 1280px) */}
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
                  <ChatInfoPanel chat={chat} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {chat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Belum ada pesan
          </div>
        ) : (
          <>
            {chat.messages.map((m, i) => (
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
            ))}

            {/* System Messages */}
            {chat.systemMessages?.map((msg, i) => (
              <div
                key={`sys-${i}`}
                className="text-center text-xs text-gray-500 italic select-none"
              >
                {msg}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center space-x-2">
        <Input placeholder="Ketik pesan..." className="flex-1" />
        <Button variant="ghost">
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
