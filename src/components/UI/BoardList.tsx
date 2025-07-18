import boardIcon from "@/assets/images/icon-board.svg";
import whiteBoardIcon from "@/assets/images/icon-board-white.svg";
import { useStore } from "@/stores/useStore";
import { useShallow } from "zustand/shallow";

export default function BoardList() {
  const openAddBoardModal = useStore((state) => state.openAddBoardModal);

  //managing Zustand:
  const selectedBoardId = useStore((state) => state.selectedBoardId);
  const setSelectedBoardId = useStore((state) => state.setSelectedBoardId);

  const boardsLength = useStore((state) => state.boards.length);

  const boardTitles = useStore(
    useShallow((state) => state.boards.map((board) => board.title)),
  );

  const boardIds = useStore(
    useShallow((state) => state.boards.map((board) => board.id)),
  );

  //custom boards obj that contains id and title
  const boardsMeta = boardIds.map((id, index) => ({
    id,
    title: boardTitles[index],
  }));

  return (
    <div>
      <h2 className="text-center text-lg font-semibold tracking-widest text-slate-400">
        All Boards (<span>X</span>)
      </h2>

      <ul className="flex flex-col gap-4 py-4 pe-8">
        {boardsMeta.map((boardObj) => (
          <li
            className={`flex cursor-pointer items-center gap-4 rounded-r-full py-3 ps-8 ${selectedBoardId === boardObj.id ? "bg-primary" : "hover:bg-violet-50"}`}
            key={boardObj.id}
            onClick={() => {
              setSelectedBoardId(boardObj.id);
            }}
          >
            <img
              alt="baord icon"
              src={selectedBoardId === boardObj.id ? whiteBoardIcon : boardIcon}
            />

            <p
              className={`pe-1 text-lg font-semibold ${selectedBoardId === boardObj.id ? "text-white dark:text-white" : "text-slate-400"}`}
            >
              {boardObj.title}
            </p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={boardsLength > 4}
        className="text-primary flex cursor-pointer items-center gap-4 rounded-r-full py-3 ps-8 pe-4 text-nowrap hover:bg-violet-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 md:w-[267px] md:pe-0 disabled:dark:bg-gray-700/20 disabled:dark:text-gray-500/60"
        onClick={() => {
          if (boardsLength <= 4) openAddBoardModal();
          else navigator.vibrate(100);
        }}
      >
        <img alt="baord icon" src={boardIcon} />
        <span className="text-lg font-semibold">+ Create new Board</span>
      </button>
    </div>
  );
}
