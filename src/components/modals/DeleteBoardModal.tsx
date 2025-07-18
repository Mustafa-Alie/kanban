import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef } from "react";

export const DELETE_BOARD_MODAL_ID = "deleteBoardModalId";

export default function DeleteBoardModal() {
  //managing Layout:
  const closeDeleteBoardModal = useStore(
    (state) => state.closeDeleteBoardModal,
  );

  const modalRef = useRef<HTMLDivElement>(null);

  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) addModalRef(DELETE_BOARD_MODAL_ID, modalRef);
  }, [addModalRef]);

  //managing zustand:
  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );
  const deleteBoard = useStore((state) => state.deleteBoard);

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="mx-4 flex flex-col gap-4 rounded-2xl bg-white p-6 md:max-w-[500px] dark:bg-gray-800"
        id={DELETE_BOARD_MODAL_ID}
        ref={modalRef}
      >
        <p className="text-lg font-semibold text-red-500">Delete this board?</p>

        <p className="text-sm leading-relaxed font-medium text-slate-400">
          Are you sure you want to delete the ‘
          <span className="font-semibold text-slate-500 italic dark:text-slate-300">
            {selectedBoard?.title}
          </span>
          ’ board?
          <br /> This action will remove all columns and tasks and cannot be
          reversed.
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            className="grow cursor-pointer rounded-full bg-red-500 py-2 font-semibold text-white hover:bg-red-500/35 hover:dark:bg-red-500/65"
            onClick={() => {
              deleteBoard(selectedBoard?.id!);
              closeDeleteBoardModal();
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className="text-primary grow cursor-pointer rounded-full bg-violet-50 font-semibold hover:bg-violet-100 hover:dark:bg-violet-200"
            onClick={closeDeleteBoardModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
