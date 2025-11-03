import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MessageCircle, Home, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/Chats", label: "All Chats", icon: MessageCircle },
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="transition-all duration-10"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SidebarTrigger />
              <Bot/>
              <h2 className="text-lg font-semibold px-4 py-2">Ritzglam Chat</h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
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

      <SidebarFooter className="text-center text-sm py-3 border-t">
        <p className="text-gray-500">v1.0.0</p>
      </SidebarFooter>
    </Sidebar>
  );
}
