import crossIcon from "@/assets/images/icon-cross.svg";
import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import type { ProgressType } from "@/types";
import { useEffect, useRef, use } from "react";
import { useImmer } from "use-immer";

export const ADD_BOARD_MODAL_ID = "addBoardModalId";

export default function AddBoardModal() {
  //local state to manage form values:
  const [progress, setProgress] = useImmer<ProgressType>(["todo", "done"]);

  //manage layout functionality:
  const closeAddBoardModal = useStore((state) => state.closeAddBoardModal);

  const { addModalRef } = use(RefContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) addModalRef(ADD_BOARD_MODAL_ID, modalRef);
  }, [addModalRef]);

  //send form values to Zustand Store:
  const addBoard = useStore((state) => state.addBoard);
  const setSelectedBoardId = useStore((state) => state.setSelectedBoardId);

  function handleSubmit(formData: FormData) {
    const boardId = crypto.randomUUID();
    const boardTitle = formData?.get("title") as string;

    addBoard(boardId, boardTitle, progress);
    setSelectedBoardId(boardId);
    closeAddBoardModal();
  }

  return (
    <section className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="w-[367px] rounded-2xl bg-white p-8 dark:bg-gray-800"
        id={ADD_BOARD_MODAL_ID}
        ref={modalRef}
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            Add New Board
          </h3>

          <button type="button" className="cursor-pointer">
            <img
              alt="cross icon for closing"
              src={crossIcon}
              className="h-4 w-4"
              onClick={closeAddBoardModal}
            />
          </button>
        </div>

        <form className="flex flex-col gap-2 pt-5" action={handleSubmit}>
          <label
            htmlFor="title"
            className="text-sm font-semibold text-slate-500"
          >
            Board name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            minLength={1}
            maxLength={35}
            required
            placeholder="e.g. Trip to Thessaloniki"
            className="rounded-lg border border-slate-300 p-2 placeholder:text-slate-400 dark:text-white"
          />

          <ul className="mt-4 flex flex-col gap-3">
            {progress.map((status, index) => (
              <li
                className="flex items-center justify-between gap-2"
                key={index}
              >
                <input
                  type="text"
                  placeholder="categorize your tasks"
                  name="status"
                  minLength={1}
                  maxLength={15}
                  className="grow rounded-lg border border-slate-300 p-2 dark:text-white"
                  value={status}
                  onChange={(e) => {
                    setProgress((draft) => {
                      draft[index] = e.target.value;
                    });
                  }}
                />

                <button
                  type="button"
                  className="cursor-pointer py-2 ps-2"
                  onClick={() => {
                    setProgress((draft) => {
                      draft.splice(index, 1);
                    });
                  }}
                >
                  <img
                    alt="cross icon for closing"
                    src={crossIcon}
                    className="h-4 w-4"
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={progress.length > 2}
            className="text-primary mt-4 cursor-pointer rounded-full bg-violet-50 py-2 font-semibold hover:bg-violet-100 disabled:cursor-not-allowed disabled:bg-gray-200 dark:hover:bg-violet-200"
            onClick={() => {
              setProgress((draft) => {
                if (draft.length <= 2) {
                  (draft as string[]).push("");
                }
              });
            }}
          >
            + Add new status
          </button>

          <button
            type="submit"
            className="bg-primary mt-2 cursor-pointer rounded-full py-2 font-semibold text-white hover:bg-indigo-300"
          >
            Create New Board
          </button>
        </form>
      </div>
    </section>
  );
}
