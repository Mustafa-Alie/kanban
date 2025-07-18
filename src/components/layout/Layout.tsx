import MainLayout from "@/components/layout/MainLayout.tsx";
import SidebarLayout from "@/components/layout/SidebarLayout.tsx";
import ModalLayout from "@/components/layout/ModalLayout";

import { ThemeContext } from "@/Context/ThemeContext";
import { use } from "react";
import { useStore } from "@/stores/useStore";

export default function Layout() {
  const { theme } = use(ThemeContext);

  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  return (
    <section className={`flex min-h-screen ${theme}`}>
      <ModalLayout />

      {isSidebarOpen && <SidebarLayout />}

      <MainLayout />
    </section>
  );
}
