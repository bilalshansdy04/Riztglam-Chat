import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MobileSidebar } from "@/components/mobile-sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useStatus } from "@/context/StatusContext";
import { Label } from "../ui/label";

export function HeaderBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isOnline } = useStatus();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* 🔹 Kiri: Hamburger + Logo */}
      <div className="flex items-center gap-2">
        {/* Hamburger untuk mobile */}
        <div className="block md:hidden">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[80vw] sm:w-[320px]">
              <SheetHeader className="p-3 border-b bg-white/80 backdrop-blur">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <MobileSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* 🔹 Kanan: Status Online + Avatar + Info User */}
      <div className="flex items-center gap-3">
        {/* Badge online */}
        <div className="relative">
          <Badge
            variant="outline"
            className={`w-3 h-3 rounded-full p-0 border-none transition-colors mr-2 ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <Label>
            {`${isOnline ? "Online" : "Offline"}`}
          </Label>
        </div>

        {/* Avatar */}
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>

        {/* Nama dan email */}
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-sm text-gray-900">Bilal Shandyarta</span>
          <span className="text-xs text-gray-500">bilal@ritzglam.id</span>
        </div>
      </div>
    </header>
  );
}
