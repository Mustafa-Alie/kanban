import showSidebarIcon from "@/assets/images/icon-show-sidebar.svg";
import { useStore } from "@/stores/useStore";

export default function ShowSidebarBtn() {
  const showSidebar = useStore((state) => state.showSidebar);

  return (
    <button
      type="button"
      className="bg-primary fixed bottom-2/12 hidden h-12 w-14 cursor-pointer items-center justify-center rounded-e-full hover:bg-indigo-300 md:flex"
      onClick={showSidebar}
    >
      <img alt="eye icon for showing sidebar" src={showSidebarIcon} />
    </button>
  );
}
