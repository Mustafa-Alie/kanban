import verticalEllipsisIcon from "@/assets/images/icon-vertical-ellipsis.svg";
import logoMobile from "@/assets/images/logo-mobile.svg";
import addTaskIcon from "@/assets/images/icon-add-task-mobile.svg";
import chevronUpIcon from "@/assets/images/icon-chevron-up.svg";
import chevronDownIcon from "@/assets/images/icon-chevron-down.svg";
import { useStore } from "@/stores/useStore";

export default function Header() {
  //managing Layout
  const toggleBoardEllipsis = useStore((state) => state.toggleBoardEllipsis);

  const openAddTaskModal = useStore((state) => state.openAddTaskModal);

  const isMobileChevronOpen = useStore((state) => state.isMobileChevronOpen);

  const openMobileChevronModal = useStore(
    (state) => state.openMobileChevronModal,
  );

  //managing Zustand State:

  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );

  //if user deletes all boards, boardEllipsisModal won't open
  const boardsLength = useStore((state) => state.boards.length);

  return (
    <header className="flex h-15 items-center justify-between border-b-2 border-gray-200 px-6 md:h-24 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <div className="flex gap-4">
        <img
          alt="kanban logo icon"
          src={logoMobile}
          className="block md:hidden"
        />

        <div
          className="flex cursor-pointer items-center justify-center gap-1.5 md:cursor-default"
          onClick={openMobileChevronModal}
        >
          <span className="text-lg font-semibold tracking-wide text-nowrap md:text-2xl dark:text-white">
            {selectedBoard?.title ?? ""}
          </span>

          <button type="button" className="cursor-pointer">
            <img
              alt="chevron down icon"
              src={isMobileChevronOpen ? chevronUpIcon : chevronDownIcon}
              className="block h-2.5 w-2.5 md:hidden"
            />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="bg-primary flex cursor-pointer items-center justify-center rounded-full px-4 py-2 text-lg font-semibold text-white hover:bg-indigo-300 md:px-5 md:py-2"
          onClick={openAddTaskModal}
        >
          <img alt="plus icon for adding tasks" src={addTaskIcon} />
          <span className="hidden md:block">&nbsp; Add New Task</span>
        </button>

        <button
          type="button"
          className="cursor-pointer p-2 disabled:cursor-not-allowed"
          disabled={boardsLength < 1}
          onClick={() => {
            if (boardsLength < 1) {
              //vibration for android users
              navigator.vibrate(100);
              return;
            }
            toggleBoardEllipsis();
          }}
        >
          <img alt="vertical ellipsis" src={verticalEllipsisIcon} />
        </button>
      </div>
    </header>
  );
}
