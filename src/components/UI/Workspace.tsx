import TaskList from "@/components/UI/TaskList";
import { useStore } from "@/stores/useStore";

export default function Workspace() {
  const selectedBoard = useStore((state) =>
    state.boards.find((b) => b.id === state.selectedBoardId),
  );

  //colors of the small circle next to the status in Tasklist
  const circleColors = ["bg-red-500", "bg-green-500", "bg-primary"] as const;

  const progressLength = selectedBoard?.progress?.length;

  //if user deletes all boards
  if (!selectedBoard?.progress)
    return <main className="grow bg-violet-50 dark:bg-slate-900"></main>;

  return (
    <>
      <main className="flex grow flex-col bg-violet-50 lg:flex-row dark:bg-slate-900">
        {selectedBoard.progress.map((status, index) => {
          const circleColor = circleColors[index];
          return (
            <TaskList
              key={index}
              statusInfo={{ status, circleColor, progressLength }}
            />
          );
        })}
      </main>
      <footer className="bg-violet-50 py-4 text-center text-sm text-gray-500 lg:flex-row dark:bg-slate-900 dark:text-gray-300">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/80 text-base font-medium hover:text-blue-400 dark:text-blue-700"
        >
          Frontend Mentor
        </a>
        <br />
        Coded by{" "}
        <a
          href="https://github.com/Mustafa-Alie"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-satisfy ps-2 text-xl font-semibold hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-200"
        >
          Mustafa Ali
        </a>
        .
      </footer>
    </>
  );
}
