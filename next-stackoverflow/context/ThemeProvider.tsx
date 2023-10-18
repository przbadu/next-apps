"use client";

import React, { useContext, createContext, useEffect } from "react";

interface ThemeContextProps {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState("");

  const handleThemeChange = () => {
    const isSystemDarkTheme = !("theme" in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
    if (localStorage.theme === 'dark' || isSystemDarkTheme) {
      setMode('dark')
      document.documentElement.classList.add('dark');
      return;
    }

    setMode('light');
    document.documentElement.classList.remove('dark');
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
