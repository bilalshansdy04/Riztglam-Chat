import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import App from './App.tsx'

const APP_VERSION = "1.0.0";

const storedVersion = localStorage.getItem("appVersion");
if (storedVersion !== APP_VERSION) {
  localStorage.removeItem("quickChats");
  localStorage.removeItem("chats");
  localStorage.setItem("appVersion", APP_VERSION);
  console.log("🧹 Data cleared because version changed");
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
