import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderBar } from "@/components/modules/HeaderBar";
import { StatusProvider } from "@/context/StatusContext";
import Chats from "@/pages/Chats";
import Login from "@/pages/Login";
import QuickChats from "./pages/QuickChats";

export default function App() {
  return (
    <Router>
      <StatusProvider>
        <SidebarProvider>
          <div className="flex flex-col w-full h-screen">
            <HeaderBar />
            <div className="flex flex-1">
              <AppSidebar />
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/quick-chats" element={<QuickChats />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </StatusProvider>
    </Router>
  );
}
