import { createContext, useContext, useState, type ReactNode } from "react";

interface StatusContextType {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <StatusContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context)
    throw new Error("useStatus must be used within a StatusProvider");
  return context;
}
