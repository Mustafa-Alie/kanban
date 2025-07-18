import hideSidebarIcon from "@/assets/images/icon-hide-sidebar.svg";
import { useStore } from "@/stores/useStore";

export default function HideSidebar() {
  const hideSidebar = useStore((state) => state.hideSidebar);

  return (
    <div className="mt-4 pe-8">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-4 rounded-r-full py-3 ps-8 hover:bg-violet-50"
        onClick={hideSidebar}
      >
        <img alt="eye icon" src={hideSidebarIcon} />
        <span className="text-lg font-semibold text-slate-400">
          Hide Sidebar
        </span>
      </button>
    </div>
  );
}
