"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full hover:bg-primary/10 transition-all duration-300"
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary rotate-0 scale-100 transition-all duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-primary rotate-0 scale-100 transition-all duration-300" />
      )}
    </Button>
  );
}
