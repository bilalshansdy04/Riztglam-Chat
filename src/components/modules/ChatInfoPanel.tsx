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
      <p className="text-sm text-gray-500 mb-4">+62 812-3456-7890</p>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Labels</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Order</Badge>
          <Badge variant="secondary">Promo</Badge>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Handled By</h4>
        <p className="text-sm">{chat.status}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-medium mb-1">Notes</h4>
        <Textarea placeholder="Tambahkan catatan internal..." />
      </div>

      <div>
        <h4 className="font-medium mb-1">Log Aktivitas</h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>10:02 Assigned</li>
          <li>10:20 Resolved</li>
        </ul>
      </div>
    </div>
  );
}
