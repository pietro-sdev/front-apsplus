'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Criação do contexto
const SidebarContext = createContext<{ isOpen: boolean; toggleSidebar: () => void }>({
  isOpen: true,
  toggleSidebar: () => {},
});

// Hook para acessar o contexto
export const useSidebar = () => useContext(SidebarContext);

// Provider que encapsulará toda a aplicação
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  // useEffect para acessar o localStorage apenas no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarOpen");
      if (savedState !== null) {
        setIsOpen(JSON.parse(savedState));
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prevState: boolean) => {
      const newState = !prevState;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarOpen", JSON.stringify(newState));
      }
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
