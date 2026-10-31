import { useEffect, useState } from "react";
import { MoonStars, SunDim } from "@phosphor-icons/react";
import { cn } from "../../lib/cn";

const STORAGE_KEY = "applyflow_theme";

function readTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle({ variant = "icon" }) {
  const [theme, setTheme] = useState(readTheme);
  const isDark = theme === "dark";
  const label = isDark ? "Light mode" : "Dark mode";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage can be unavailable; the class still applies for this session */
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={variant === "icon" ? `Switch to ${label.toLowerCase()}` : undefined}
      className={cn(
        "transition-colors duration-150",
        variant === "full"
          ? "flex h-10 w-full items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-medium text-muted hover:bg-panel hover:text-ink"
          : "grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-panel-2 hover:text-ink",
      )}
    >
      {isDark ? <SunDim size={17} /> : <MoonStars size={17} />}
      {variant === "full" ? <span>{label}</span> : null}
    </button>
  );
}
