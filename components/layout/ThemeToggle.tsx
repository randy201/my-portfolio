"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Changer de thème clair/sombre"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true" className="text-sm dark:hidden">
        ☾
      </span>
      <span aria-hidden="true" className="hidden text-sm dark:inline">
        ☀
      </span>
    </button>
  );
}
