import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatStatusBadge } from "@/components/modules/ChatStatusBadge";
import type { Chat } from "@/data/dummyChats";

interface ChatListProps {
  chats: Chat[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function ChatList({ chats, selectedId, onSelect }: ChatListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`p-3 rounded-lg cursor-pointer border ${
              selectedId === chat.id
                ? "bg-blue-100 border-blue-400"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{chat.name}</h4>
              <ChatStatusBadge status={chat.status} />
            </div>
            <p className="text-sm text-gray-600">{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
