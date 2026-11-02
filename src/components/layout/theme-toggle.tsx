"use client";
import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // next-themes resolves the stored theme after hydration; rendering the
  // icon before `mounted` would produce a hydration mismatch.
  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      title="Toggle theme"
      onClick={toggleTheme}
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <Sun className="size-5 opacity-0" />
      )}
    </Button>
  );
}
