import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Chat } from "@/data/dummyChats";

interface ChatWindowProps {
  chat: Chat | null;
  onStatusChange: (status: Chat["status"]) => void;
}

export function ChatWindow({ chat, onStatusChange }: ChatWindowProps) {
  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Pilih chat di sebelah kiri
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b flex justify-between items-center bg-white">
        <h3 className="font-semibold">{chat.name}</h3>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => onStatusChange("Assigned to Human")}
          >
            Assign
          </Button>
          <Button
            variant="outline"
            onClick={() => onStatusChange("Handled by AI")}
          >
            Unassign
          </Button>
          <Button variant="default" onClick={() => onStatusChange("Resolved")}>
            Resolve
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        {chat.messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.from === "ai" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                m.from === "ai"
                  ? "bg-white border text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div className="p-3 border-t bg-white flex items-center space-x-2 fixed bottom-0 left-1/3 right-0">
          <Input type="text" placeholder="Ketik pesan..." className="flex-1" />
          <Button>Kirim</Button>
        </div>
      </div>
    </div>
  );
}
