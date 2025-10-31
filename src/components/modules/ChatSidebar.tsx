import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatStatusBadge } from "@/components/modules/ChatStatusBadge";
import type { Chat } from "@/data/dummyChats";

interface ChatSidebarProps {
  chats: Chat[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  globalSearch: string;
}

export function ChatSidebar({
  chats,
  selectedId,
  onSelect,
  globalSearch,
}: ChatSidebarProps) {
  const [tab, setTab] = useState("all");
  const [localSearch, setLocalSearch] = useState("");

  const searchTerm = globalSearch || localSearch;

  const filtered = chats.filter((chat) => {
    const matchTab =
      tab === "all" ||
      (tab === "assigned" && chat.status === "Assigned to Human") ||
      (tab === "unassigned" && chat.status === "Handled by AI");

    const matchSearch =
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((m) =>
        m.text.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchTab && matchSearch;
  });

  return (
    <div className="h-full flex flex-col border-r bg-white">
      <Tabs value={tab} onValueChange={setTab} className="border-b">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="p-2">
        <Input
          placeholder="Search chat..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1 p-2">
        {filtered.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`p-3 rounded-lg border mb-2 cursor-pointer ${
              selectedId === chat.id
                ? "bg-blue-100 border-blue-400"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">{chat.name}</h4>
              <ChatStatusBadge status={chat.status} />
            </div>
            <p className="text-xs text-gray-500">{chat.phone}</p>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            <p className="text-xs text-gray-400 text-right mt-1">12:45 PM</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
