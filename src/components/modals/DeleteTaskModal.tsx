import { useStore } from "@/stores/useStore";

export default function DeleteTaskModal() {
  //managing Layout:
  const closeDeleteTaskModal = useStore((state) => state.closeDeleteTaskModal);

  const closeTaskModal = useStore((state) => state.closeTaskModal);

  //managing Zustand:
  const selectedTask = useStore((state) => {
    const selectedBoard = state.boards.find(
      (b) => b.id === state.selectedBoardId,
    );
    return selectedBoard?.tasks.find((t) => t.id === state.selectedTaskId);
  });

  const deleteTask = useStore((state) => state.deleteTask);

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 flex flex-col gap-4 rounded-2xl bg-white p-6 md:max-w-[500px] dark:bg-gray-800">
        <p className="text-lg font-semibold text-red-500">Delete this board?</p>

        <p className="text-sm leading-relaxed font-medium text-slate-400">
          Are you sure you want to delete the task ‘
          <span className="text-slate-500 italic">{selectedTask?.title}</span>
          ’ ?
          <br />
          {selectedTask?.title}
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            className="grow cursor-pointer rounded-full bg-red-500 py-2 font-semibold text-white hover:bg-red-500/35 hover:dark:bg-red-500/65"
            onClick={() => {
              deleteTask(selectedTask?.id!);
              closeDeleteTaskModal();
              closeTaskModal();
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className="text-primary grow cursor-pointer rounded-full bg-violet-50 font-semibold hover:bg-violet-100 hover:dark:bg-violet-200"
            onClick={closeDeleteTaskModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
