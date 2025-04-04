import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipe untuk nilai ThemeContext
interface ThemeContextProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  isDark: boolean;
}

// Buat context dengan tipe
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook untuk menggunakan ThemeContext
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Ambil tema awal dari localStorage atau default ke 'dark'
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    return savedTheme || "dark";
  });

  // Fungsi untuk toggle tema
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Terapkan tema ke body
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);

    // Tambahkan meta theme-color untuk browser mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#030014" : "#ffffff");
    }
  }, [theme]);

  // Nilai context
  const value: ThemeContextProps = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;