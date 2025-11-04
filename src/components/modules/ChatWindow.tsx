import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat } from "@/data/dummyChats";
import { SendHorizontal } from "lucide-react";

interface ChatWindowProps {
  chat: Chat | null;
  onStatusChange: (status: Chat["status"]) => void;
}

export function ChatWindow({ chat, onStatusChange }: ChatWindowProps) {
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
        <div>
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-gray-500">{chat.status}</p>
        </div>
        <div className="space-x-2">
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
      <div className="p-3 border-t bg-white flex items-center space-x-2 ">
        <Input placeholder="Ketik pesan..." className="flex-1" />
        <Button variant="ghost" className="">
          <SendHorizontal/>
        </Button>
      </div>
    </div>
  );
}
