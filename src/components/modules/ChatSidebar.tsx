import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chat } from "@/data/dummyChats";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CircleCheck, Filter, Mail, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";

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
  const [tab, setTab] = useState("assigned");
  const [localSearch, setLocalSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("All Agents");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false); // 👈 new state
  const { state } = useSidebar();

  const searchTerm = globalSearch || localSearch;

  // 🔹 Kelompokkan agents
  const aiAgents = Array.from(
    new Set(
      chats
        .map((c) => c.handledBy)
        .filter((a) => a?.toLowerCase().startsWith("ai agent"))
    )
  );
  const humanAgents = Array.from(
    new Set(
      chats
        .map((c) => c.handledBy)
        .filter((a) => a && !a.toLowerCase().startsWith("ai agent"))
    )
  );

  const filtered = chats.filter((chat) => {
    const matchTab =
      tab === "assigned"
        ? chat.status === "Assigned to Human"
        : tab === "unassigned"
        ? chat.status === "Handled by AI"
        : chat.status === "Resolved";

    const matchAgent =
      selectedAgent === "All Agents" || chat.handledBy === selectedAgent;

    const matchSearch =
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((m) =>
        m.text.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchUnread =
      !showUnreadOnly || (chat.unreadCount && chat.unreadCount > 0); // 👈 filter unread toggle

    return matchTab && matchAgent && matchSearch && matchUnread;
  });

  return (
    <div className="h-full flex flex-col border-r bg-white">
      {/* 🔹 Filter Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
        {/* Agent Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              {selectedAgent}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by Agent</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedAgent("All Agents")}>
              All Agents
            </DropdownMenuItem>

            {aiAgents.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>AI Agents</DropdownMenuLabel>
                {aiAgents.map((agent) => (
                  <DropdownMenuItem
                    key={agent}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    {agent}
                  </DropdownMenuItem>
                ))}
              </>
            )}

            {humanAgents.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Human Agents</DropdownMenuLabel>
                {humanAgents.map((agent) => (
                  <DropdownMenuItem
                    key={agent}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    {agent}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🔹 Unread Filter Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={showUnreadOnly ? "default" : "outline"}
              className="flex items-center gap-1"
              onClick={() => setShowUnreadOnly((prev) => !prev)}
            >
              {showUnreadOnly ? (
                <>
                  <MailOpen className="w-4 h-4" />
                  Show All
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Unread
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showUnreadOnly ? "Show all messages" : "Show only unread chats"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* 🔹 Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="border-b">
        <TabsList className="w-full flex justify-around">
          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Chats assigned to human agents</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Chats assigned to AI agents</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <TabsTrigger value="resolved">
                <CircleCheck />
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>Chats resolved</TooltipContent>
          </Tooltip>
        </TabsList>
      </Tabs>

      {/* 🔹 Search bar */}
      <div className="p-2">
        <Input
          placeholder="Search chat..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
              
      {/* 🔹 Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filtered.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`w-full p-3 rounded-lg border mb-2 cursor-pointer transition-all duration-150 ${
                selectedId === chat.id
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1 relative">
                <h4 className="font-medium truncate pr-6">{chat.name}</h4>
                <div className="flex items-center gap-1">
                  {Number(chat.unreadCount) > 0 && (
                    <Badge
                      className="flex items-center justify-center h-5 min-w-5 rounded-full px-1 font-mono tabular-nums animate-pulse"
                      variant="destructive"
                    >
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500">{chat.phone}</p>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-400 text-right mt-1">
                {chat.handledBy}
              </p>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-400 mt-10">
              No chats found
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
