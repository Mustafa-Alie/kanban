import darkThemeIcon from "@/assets/images/icon-dark-theme.svg";
import lightThemeIcon from "@/assets/images/icon-light-theme.svg";
import { ThemeContext } from "@/Context/ThemeContext";
import { use } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = use(ThemeContext);

  return (
    <div className="mx-auto flex h-12.5 w-62.5 justify-center gap-6 bg-violet-50 py-4 dark:bg-neutral-900">
      <img alt="sun icon" src={lightThemeIcon} />

      <div
        className={`bg-primary flex h-5 w-10 cursor-pointer items-center rounded-full p-px ${theme === "light" ? "justify-start" : "justify-end"}`}
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        <div className="h-3.5 w-3.5 rounded-full bg-white"></div>
      </div>

      <img alt="moon icon" src={darkThemeIcon} />
    </div>
  );
}
