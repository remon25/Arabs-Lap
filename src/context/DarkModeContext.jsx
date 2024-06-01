import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");

  function toggleDarkMode() {
    setDarkMode((d) => !d);
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  },[darkMode]);
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
