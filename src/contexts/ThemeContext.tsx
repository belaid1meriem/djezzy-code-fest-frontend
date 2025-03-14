import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const dark = localStorage.getItem("dark");
    const enableDarkMode = dark ? dark === "true" : false;
    document.documentElement.classList.toggle("dark", enableDarkMode);
    return enableDarkMode;
  });

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("dark", JSON.stringify(newMode));
      return newMode;
    });
  };

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
