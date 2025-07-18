import Task from "@/components/UI/Task";
import { useStore } from "@/stores/useStore";
import { useShallow } from "zustand/shallow";

export default function TaskList({
  statusInfo: { status, circleColor, progressLength },
}: {
  statusInfo: {
    status: string;
    circleColor: "bg-red-500" | "bg-green-500" | "bg-primary";
    progressLength: 0 | 1 | 2 | 3 | undefined;
  };
}) {
  const tasks = useStore(
    useShallow((state) => {
      const selectedBoard = state.boards.find(
        (b) => b.id === state.selectedBoardId,
      );
      return selectedBoard
        ? selectedBoard.tasks.filter((t) => t.progress === status)
        : [];
    }),
  );

  return (
    <section
      className={`flex basis-full flex-col gap-6 p-8 lg:flex-grow-0 ${progressLength! > 2 ? "lg:basis-1/3" : "lg:basis-1/2"}`}
    >
      <div className="flex items-center justify-center gap-4 text-slate-400 md:justify-start">
        <div className={`h-4 w-4 rounded-full ${circleColor}`}></div>

        <p className="font-bold">
          <span className="uppercase">{status}&nbsp; &nbsp;</span>
          <span>({tasks.length})</span>
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {tasks.map((task) => (
          <Task
            key={task.id}
            taskInfo={{
              id: task.id,
              title: task.title,
              due: task.due!,
            }}
          />
        ))}
      </div>
    </section>
  );
}
