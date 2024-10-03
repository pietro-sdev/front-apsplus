'use client'
import { createContext, useContext, useState, ReactNode } from "react";

// Criação do contexto
const SidebarContext = createContext<{ isOpen: boolean; toggleSidebar: () => void }>({
  isOpen: true,
  toggleSidebar: () => {},
});

// Hook para acessar o contexto
export const useSidebar = () => useContext(SidebarContext);

// Provider que encapsulará toda a aplicação
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    setIsOpen((prevState: boolean) => {
      const newState = !prevState;
      localStorage.setItem("sidebarOpen", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
