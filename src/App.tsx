import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Chats from "@/pages/Chats";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="w-full flex">
          <AppSidebar />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/Chats" element={<Chats />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </Router>
  );
}
