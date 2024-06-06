/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "dark-mode");
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );
  function toggleDarkMode() {
    setDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const darkmodeContext = useContext(DarkModeContext);
  if (darkmodeContext === undefined)
    throw new Error("Context used out of the boundries");
  return darkmodeContext;
}

export { DarkModeProvider, useDarkMode };
