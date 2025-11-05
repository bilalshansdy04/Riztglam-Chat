import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  MessageCircle,
  Home,
  Bot,
  User,
  LogOut,
  Lock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useStatus } from "@/context/StatusContext";

export function AppSidebar() {
  const location = useLocation();
  const { isOnline, setIsOnline } = useStatus();; 
  
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/chats", label: "All Chats", icon: MessageCircle },
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="transition-all duration-10"
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SidebarTrigger />
              <Bot />
              <h2 className="text-lg font-semibold px-4 py-2">
                Ritzglam Chat
              </h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <Link to={to}>
                    <SidebarMenuButton
                      className={
                        location.pathname === to
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "hover:bg-gray-100"
                      }
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer dengan Popover Profile */}
      <SidebarFooter className="border-t py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 hover:bg-gray-100">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </PopoverTrigger>

              {/* 🔹 Popover Content */}
              <PopoverContent
                align="end"
                side="right"
                className="w-60 p-4 bg-white shadow-md rounded-lg"
              >
                {/* Avatar + Nama */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Profile"
                    />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      Bilal Shandyarta
                    </p>
                    <p className="text-xs text-gray-500">
                      bilal@ritzglam.id
                    </p>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* Status Switch */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                  <Switch
                    checked={isOnline}
                    onCheckedChange={setIsOnline}
                  />
                </div>

                <Separator className="my-2" />

                {/* Tombol Aksi */}
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-start gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Reset Password
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center justify-start gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
