import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderBarProps {
  onResolve: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedChatName: string | null;
}

export function HeaderBar({
  onResolve,
  searchQuery,
  setSearchQuery,
  selectedChatName,
}: HeaderBarProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-white">
      <div className="flex items-center space-x-2 w-1/3">
        <Input
          type="text"
          placeholder="Search name or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        {selectedChatName && (
          <Button variant="default" onClick={onResolve}>
            Resolve {selectedChatName}
          </Button>
        )}
      </div>
    </div>
  );
}
