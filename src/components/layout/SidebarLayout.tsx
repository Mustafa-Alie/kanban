import darkLogo from "@/assets/images/logo-dark.svg";
import lightLogo from "@/assets/images/logo-light.svg";

import BoardList from "@/components/UI/BoardList.tsx";
import ThemeToggler from "@/components/UI/ThemeToggler";
import HideSidebar from "@/components/UI/HideSidebar";
import { use } from "react";
import { ThemeContext } from "@/Context/ThemeContext";

export default function SidebarLayout() {
  const { theme } = use(ThemeContext);

  return (
    <aside className="sticky top-0 hidden max-h-screen w-75 min-w-[300px] border-e border-gray-300 py-8 md:flex md:flex-col dark:border-gray-700 dark:bg-gray-800">
      <img
        alt="logo image"
        src={theme === "light" ? darkLogo : lightLogo}
        className="mx-auto mb-14"
      />

      <BoardList />

      <div className="mt-auto">
        <ThemeToggler />

        <HideSidebar />
      </div>
    </aside>
  );
}
