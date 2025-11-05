import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  localStorage.removeItem("quickChats");
  localStorage.removeItem("chats");
  console.log("🧹 Cleared quickChats from localStorage");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
