import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();
//Context is something that is inherited from parent to child automatically. It is a way to pass data through the component tree without having to pass props down manually at every level
export const ThemeProvider = ({ children }) => {
  // Check user's system preference or local storage for initial theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Persist theme choice in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
