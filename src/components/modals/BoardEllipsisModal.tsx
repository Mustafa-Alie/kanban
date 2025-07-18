import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef } from "react";

export const BOARD_ELLIPSIS_MODAL_ID = "boardEllipsisModalId" as const;

export default function BoardEllipsisModal() {
  //managing Layout:
  const closeBoardEllipsis = useStore((state) => state.closeBoardEllipsis);
  const openDeleteBoardModal = useStore((state) => state.openDeleteBoardModal);
  const openEditBoardModal = useStore((state) => state.openEditBoardModal);

  const modalRef = useRef<HTMLDivElement>(null);
  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) addModalRef(BOARD_ELLIPSIS_MODAL_ID, modalRef);
  }, [addModalRef]);

  return (
    <div
      className="absolute top-15.5 right-8 flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl/20 md:top-24.5 dark:bg-slate-900 dark:inset-shadow-sm dark:inset-shadow-slate-500/40"
      id={BOARD_ELLIPSIS_MODAL_ID}
      ref={modalRef}
    >
      <button
        type="button"
        className="cursor-pointer text-nowrap text-slate-400 hover:text-slate-300 hover:underline"
        onClick={() => {
          closeBoardEllipsis();
          openEditBoardModal();
        }}
      >
        Edit Board
      </button>

      <button
        type="button"
        className="cursor-pointer text-nowrap text-red-500 hover:text-red-700 hover:underline hover:dark:text-red-400"
        onClick={() => {
          closeBoardEllipsis();
          openDeleteBoardModal();
        }}
      >
        Delete Board
      </button>
    </div>
  );
}
