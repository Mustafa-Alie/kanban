import crossIcon from "@/assets/images/icon-cross.svg";
import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import type { ProgressType, TaskType } from "@/types";
import { use, useEffect, useRef } from "react";
import { useImmer } from "use-immer";

export const EDIT_BOARD_MODAL_ID = "editBoardId" as const;

export default function EditBoardModal() {
  //managing Layout:
  const closeEditBoardModal = useStore((state) => state.closeEditBoardModal);

  const modalRef = useRef<HTMLDivElement>(null);

  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) {
      addModalRef(EDIT_BOARD_MODAL_ID, modalRef);
    }
  }, [addModalRef]);

  //managing Zustand:
  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );
  const setSelectedBoardId = useStore((state) => state.setSelectedBoardId);

  const editBoard = useStore((state) => state.editBoard);

  //local state to handle form:
  const [editedBoard, setEditedBoard] = useImmer<{
    title: string;
    progress: string[];
    tasks: TaskType[];
  }>({
    title: selectedBoard?.title!,
    progress: [...selectedBoard?.progress!],
    tasks: [...(selectedBoard?.tasks ?? [])],
  });

  //Guard Clause in case of a bug
  if (!selectedBoard?.id) return null;

  function handleSubmit() {
    editBoard(
      selectedBoard?.id!,
      editedBoard.title,
      editedBoard.progress as ProgressType,
      editedBoard.tasks,
    );
    closeEditBoardModal();
    setSelectedBoardId(selectedBoard?.id!);
  }

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="rounded-2xl bg-white p-8 dark:bg-gray-800"
        id={EDIT_BOARD_MODAL_ID}
        ref={modalRef}
      >
        <div className="flex justify-between">
          <h3
            className="text-lg font-semibold dark:text-white"
            onClick={() => {
              console.log(selectedBoard);
            }}
          >
            Edit Board
          </h3>

          <button type="button" className="cursor-pointer">
            <img
              alt="cross icon for closing"
              src={crossIcon}
              className="h-4 w-4"
              onClick={closeEditBoardModal}
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
            maxLength={30}
            required
            placeholder="e.g. Trip to Thessaloniki"
            className="rounded-lg border border-slate-300 p-2 placeholder:text-slate-400 dark:text-white"
            value={editedBoard.title}
            onChange={(e) => {
              setEditedBoard((draft) => {
                draft.title = e.target.value;
              });
            }}
          />

          <ul className="mt-4 flex flex-col gap-3">
            {editedBoard.progress.map((prog, index) => (
              <li
                className="flex items-center justify-between gap-2"
                key={index}
              >
                <input
                  type="text"
                  name="progress"
                  required
                  minLength={1}
                  maxLength={15}
                  placeholder="enter status for your tasks"
                  className="grow rounded-lg border border-slate-300 p-2 dark:text-white"
                  value={prog}
                  onChange={(e) => {
                    setEditedBoard((draft) => {
                      draft.progress[index] = e.target.value;
                    });
                  }}
                />

                <button
                  type="button"
                  className="cursor-pointer py-2 ps-2"
                  onClick={() => {
                    setEditedBoard((draft) => {
                      const removedStatus = draft.progress[index];

                      // Remove the status from progress list
                      draft.progress.splice(index, 1);

                      // Remove all tasks that had that status
                      draft.tasks = draft.tasks.filter(
                        (task) => task.progress !== removedStatus,
                      );
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
            className="text-primary mt-4 cursor-pointer rounded-full bg-violet-50 py-2 font-semibold hover:bg-violet-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:hover:bg-violet-200 disabled:dark:bg-gray-700/20 disabled:dark:text-gray-500/60"
            disabled={editedBoard.progress.length > 2}
            onClick={() => {
              if (editedBoard.progress.length <= 2)
                setEditedBoard((draft) => {
                  draft.progress.push("");
                });
            }}
          >
            + Add new column
          </button>

          <button
            type="submit"
            className="bg-primary mt-2 cursor-pointer rounded-full py-2 font-semibold text-white hover:bg-indigo-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
