import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
