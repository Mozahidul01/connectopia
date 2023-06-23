"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <SunIcon
          className="w-8 h-8 cursor-pointer text-gray-100"
          onClick={() => setTheme("light")}
        />
      ) : (
        <MoonIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
};

export default ThemeSwitch;
