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
  let className = "";

  if (status === "Assigned to Human"){ variant = "default";

  }else if (status === "Handled by AI") {variant = "secondary"; className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-700";
  }else if(status === "Resolved") variant = "destructive";

  return <Badge variant={variant} className={className}>{status}</Badge>;
}
