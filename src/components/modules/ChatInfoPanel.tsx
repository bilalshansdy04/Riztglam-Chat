import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import type { Chat } from "@/data/dummyChats";

interface ChatInfoPanelProps {
  chat: Chat | null;
}

export function ChatInfoPanel({ chat }: ChatInfoPanelProps) {
  if (!chat)
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Tidak ada chat dipilih
      </div>
    );

  return (
    <div className="flex flex-col h-full border-l bg-white p-3">
      <h3 className="font-semibold text-lg mb-1">{chat.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{chat.phone}</p>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Labels</h4>
        <div className="flex flex-wrap gap-2">
          {(chat.labels ?? []).length > 0 ? (
            chat.labels!.map((label, i) => (
              <Badge key={i} variant="secondary">
                {label}
              </Badge>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic">No labels</p>
          )}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Handled By</h4>
        <p className="text-sm">
          {chat.status === "Assigned to Human"
            ? "Human Agent"
            : chat.status === "Resolved"
            ? "Closed by Human"
            : "AI Agent"}
        </p>
      </div>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Notes</h4>
        <Textarea value={chat.notes} readOnly className="resize-none" />
      </div>

      <div>
        <h4 className="font-medium mb-1">Log Aktivitas</h4>
        <Textarea value={chat.notes ?? ""} readOnly className="resize-none" />

        <ul className="text-xs text-gray-500 space-y-1">
          {(chat.log ?? []).map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
