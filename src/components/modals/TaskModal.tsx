import { RefContext } from "@/Context/RefContext";
import verticalEllipsisIcon from "@/assets/images/icon-vertical-ellipsis.svg";
import FlatPicker from "@/components/UI/FlatPicker";

import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef, useState } from "react";
import TaskEllipsisModal, {
  TASK_ELLIPSIS_MODAL_ID,
} from "@/components/modals/TaskEllipsisModal";
import useCloseModal from "@/hooks/useCloseModal";

export const TASK_MODAL_ID = "taskModalID" as const;

export default function TaskModal() {
  //managing Layout:
  const closeTaskModal = useStore((state) => state.closeTaskModal);

  const modalRef = useRef<HTMLDivElement>(null);
  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) addModalRef(TASK_MODAL_ID, modalRef);

    //when the comp unmounts, change the state of the modal back to false (because it affects useCloseModal )
  }, [addModalRef]);

  // managing Task Ellipsis Modal:
  const isTaskEllipsisOpen = useStore((state) => state.isTaskEllipsisOpen);
  const toggleTaskEllipsisModal = useStore(
    (state) => state.toggleTaskEllipsisModal,
  );

  const closeTaskEllipsisModal = useStore(
    (state) => state.closeTaskEllipsisModal,
  );

  useCloseModal(
    TASK_ELLIPSIS_MODAL_ID,
    isTaskEllipsisOpen,
    closeTaskEllipsisModal,
  );

  //managing Zustand State:
  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );

  const selectedTask = useStore((state) =>
    selectedBoard?.tasks.find((t) => t.id === state.selectedTaskId),
  );

  const editTask = useStore((state) => state.editTask);

  const initialDue = selectedTask?.due ? new Date(selectedTask.due) : null;
  const [date, setDate] = useState<Date | null>(initialDue);
  const [time, setTime] = useState<Date | null>(initialDue);

  // Sync Flatpickr changes with Zustand
  useEffect(() => {
    if (!selectedTask || !date) return;

    const updatedDue = new Date(date);
    if (time) {
      updatedDue.setHours(time.getHours(), time.getMinutes(), 0, 0);
    } else {
      updatedDue.setHours(0, 0, 0, 0);
    }

    editTask(selectedTask.id, { due: updatedDue });
  }, [date, time]);

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!selectedTask) return;
    editTask(selectedTask.id, { progress: e.target.value });
  }

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="mx-4 flex max-w-[450px] flex-col rounded-2xl bg-white p-8 dark:bg-gray-800"
        id={TASK_MODAL_ID}
        ref={modalRef}
      >
        <div className="relative flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold dark:text-white">
            {selectedTask?.title}
          </h3>

          <button
            type="button"
            className="cursor-pointer p-2"
            onClick={toggleTaskEllipsisModal}
          >
            <img
              alt="vertical ellipsis"
              src={verticalEllipsisIcon}
              className="h-5 w-1.5"
            />
          </button>
          {isTaskEllipsisOpen && <TaskEllipsisModal />}
        </div>

        <p className="py-4 text-sm font-medium text-slate-500 dark:text-slate-300">
          {selectedTask?.desc}
        </p>

        <div className="py-4">
          <FlatPicker
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="progress"
            className="text-sm font-semibold text-slate-500 dark:text-slate-300"
          >
            Current status
          </label>
          <select
            className="cursor-pointer rounded-lg border border-slate-300 p-2 dark:bg-gray-800 dark:text-white"
            name="progress"
            value={selectedTask?.progress || ""}
            onChange={handleStatusChange}
          >
            {selectedBoard?.progress?.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="text-primary w-full cursor-pointer rounded-full bg-violet-50 py-2 font-semibold hover:bg-violet-100 hover:dark:bg-violet-200"
            onClick={closeTaskModal}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
}
