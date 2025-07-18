import crossIcon from "@/assets/images/icon-cross.svg";
import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef, useState } from "react";
import FlatPicker from "../UI/FlatPicker";

export const ADD_TASK_MODAL_ID = "addTaskModalId";

export default function AddTaskModal() {
  // managing layout:
  const closeAddTaskModal = useStore((state) => state.closeAddTaskModal);

  const modalRef = useRef<HTMLDivElement>(null);

  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) addModalRef(ADD_TASK_MODAL_ID, modalRef);
  }, [addModalRef]);

  // managing zustand state:
  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );

  const addTask = useStore((state) => state.addTask);

  // local state for handling time and date of FlatPickr
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  function handleSubmit(formData: FormData) {
    if (!formData.get("title") || !formData.get("title")) return;

    let due: Date | null = null;

    if (date) {
      if (time) {
        due = new Date(date);
        due.setHours(time.getHours(), time.getMinutes(), 0, 0);
      } else {
        due = new Date(date);
        due = new Date(date.toDateString());
      }
    }

    const newTask = {
      id: crypto.randomUUID() as string,
      title: formData.get("title") as string,
      desc: formData.get("desc") as string,
      due: due,
      progress: formData.get("progress") as string,
    };

    addTask(newTask);

    closeAddTaskModal();
  }

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="max-w-md rounded-2xl bg-white p-8 dark:bg-gray-800"
        id={ADD_TASK_MODAL_ID}
        ref={modalRef}
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold dark:text-white">Add Task</h3>

          <button type="button" className="cursor-pointer">
            <img
              alt="cross icon for closing"
              src={crossIcon}
              className="h-4 w-4"
              onClick={closeAddTaskModal}
            />
          </button>
        </div>

        <form className="flex flex-col gap-4 pt-5" action={handleSubmit}>
          <label
            htmlFor="title"
            className="text-sm font-semibold text-slate-500"
          >
            Task Title
          </label>
          <input
            type="text"
            name="title"
            minLength={1}
            maxLength={30}
            required
            placeholder="Enter Title"
            className="rounded-lg border border-slate-300 p-2 placeholder:text-slate-400"
          />

          <textarea
            name="desc"
            rows={4}
            maxLength={100}
            placeholder="Task description"
            className="resize-none rounded-lg border border-slate-300 p-2 placeholder:text-slate-400"
          />

          <FlatPicker
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
          />

          <select
            className="cursor-pointer rounded-lg border border-slate-300 p-2 dark:bg-gray-800 dark:text-white"
            name="progress"
          >
            {selectedBoard?.progress
              ? selectedBoard.progress.map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))
              : []}
          </select>

          <button
            type="submit"
            className="bg-primary mt-2 cursor-pointer rounded-full py-2 font-semibold text-white hover:bg-indigo-300"
          >
            Create New Task
          </button>
        </form>
      </div>
    </section>
  );
}
