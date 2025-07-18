import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef } from "react";

export const TASK_ELLIPSIS_MODAL_ID = "taskEllipsisModalId";

export default function TaskEllipsisModal() {
  const closeTaskEllipsisModal = useStore(
    (state) => state.closeTaskEllipsisModal,
  );
  const openDeleteTaskModal = useStore((state) => state.openDeleteTaskModal);

  const modalRef = useRef<HTMLDivElement>(null);
  const { addModalRef } = use(RefContext);

  useEffect(() => {
    if (modalRef.current) addModalRef(TASK_ELLIPSIS_MODAL_ID, modalRef);
  }, [addModalRef]);

  return (
    <div
      className="absolute top-9 right-0 z-20 flex flex-col gap-2 rounded-lg bg-white p-4 shadow-xl/20 dark:bg-slate-900 dark:inset-shadow-sm dark:inset-shadow-slate-500/40"
      id={TASK_ELLIPSIS_MODAL_ID}
      ref={modalRef}
    >
      <button
        type="button"
        className="cursor-pointer text-red-500 hover:text-red-700 hover:underline hover:dark:text-red-400"
        onClick={() => {
          closeTaskEllipsisModal();
          openDeleteTaskModal();
        }}
      >
        Delete Task
      </button>
    </div>
  );
}
