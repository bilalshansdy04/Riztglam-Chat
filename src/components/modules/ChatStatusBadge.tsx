import { Badge } from "@/components/ui/badge";

interface ChatStatusBadgeProps {
  status: string;
}

export function ChatStatusBadge({ status }: ChatStatusBadgeProps) {
  let variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline" = "outline";

  if (status === "Assigned to Human") variant = "default";
  if (status === "Handled by AI") variant = "secondary";
  if (status === "Resolved") variant = "destructive";

  return <Badge variant={variant}>{status}</Badge>;
}
