import { useStore } from "@/stores/useStore";

export default function Task({
  taskInfo: { id, title, due },
}: {
  taskInfo: {
    id: string;
    title: string;
    due: Date;
  };
}) {
  //managing Layout
  const openTaskModal = useStore((state) => state.openTaskModal);

  //managing Zustand:
  const setSelectedTaskId = useStore((state) => state.setSelectedTaskId);

  return (
    <div
      className="cursor-pointer rounded-xl bg-white p-5 text-center shadow-xl md:w-fit md:text-start dark:bg-gray-800 dark:text-white"
      onClick={() => {
        setSelectedTaskId(id);
        openTaskModal();
      }}
    >
      <p className="pb-2 text-base font-semibold md:w-fit">{title}</p>

      <p className="pt-2 text-xs font-semibold text-slate-500 md:w-fit dark:text-slate-300">
        <span className="text-sm font-bold text-red-500">Due: &nbsp;</span>

        {due ? (
          <span>
            {due.getHours() === 0 && due.getMinutes() === 0
              ? due.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : due.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
          </span>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
}
