import type { TodoSliceType } from "@/types";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { initData } from "@/initiailTodoData";

export const createTodoSlice = devtools(
  immer<TodoSliceType>((set) => ({
    boards: initData.boards,

    addBoard: (boardId, boardTitle, boardProgressArr) =>
      set((state) => {
        state.boards.push({
          id: boardId,
          title: boardTitle,
          progress: boardProgressArr,
          tasks: [],
        });
      }),

    editBoard: (boardId, boardTitle, boardProgressArr, newTasks) =>
      set((state) => {
        const selectedBoard = state.boards.find((b) => b.id === boardId);
        if (!selectedBoard) {
          console.error(`Invalid board ID: "${boardId}" not found`);
          return;
        }

        //custom obj with key = the old status, value = the new status
        const statusMeta = Object.fromEntries(
          selectedBoard.progress.map((status, index) => [
            status,
            boardProgressArr[index],
          ]),
        );

        // update the progress property in each Task Obj, to represent new values
        const clonedTasks = newTasks.map((task) => ({ ...task }));

        clonedTasks.forEach((task) => {
          const newStatus = statusMeta[task.progress];
          if (newStatus) task.progress = newStatus;
        });
        //update board title and progress array:
        selectedBoard.title = boardTitle;
        selectedBoard.progress = boardProgressArr;
        selectedBoard.tasks = clonedTasks;
      }),

    deleteBoard: (boardID) =>
      set((state) => {
        const boardIndex = state.boards.findIndex((b) => b.id === boardID);
        if (boardIndex === -1) {
          console.error(`Invalid board ID: "${boardID}" not found`);
          return;
        }

        state.boards = state.boards.filter((b) => b.id !== boardID);

        if (state.boards.length > 0) state.selectedBoardId = state.boards[0].id;
        else state.selectedBoardId = null;
      }),

    //initially first board, and null if user delete all baords
    selectedBoardId: initData.boards.length > 0 ? initData.boards[0].id : null,

    setSelectedBoardId: (id) =>
      set((state) => {
        const selectedBoard = state.boards.find((b) => b.id === id);
        if (!selectedBoard) {
          console.error(`Invalid board ID: "${id}" not found`);
          return;
        }
        state.selectedBoardId = id;
      }),

    ///////////////////////////////// TASKS:

    selectedTaskId: null,
    setSelectedTaskId: (taskId) =>
      set((state) => {
        const selectedBoard = state.boards.find(
          (b) => b.id === state.selectedBoardId,
        );
        const selectedTask = selectedBoard?.tasks.find((t) => t.id === taskId);
        if (!selectedTask) {
          console.error(`no task found with this id: ${taskId}`);
          return;
        }
        state.selectedTaskId = taskId;
      }),

    addTask: (newTask) =>
      set((state) => {
        const selectedBoard = state.boards.find(
          (b) => b.id === state.selectedBoardId,
        );
        if (!selectedBoard) {
          console.error(
            `Invalid board ID: "${state.selectedBoardId}" not found`,
          );
          return;
        }

        selectedBoard.tasks.push(newTask);
      }),

    editTask: (taskId, changes) =>
      set((state) => {
        const selectedBoard = state.boards.find(
          (b) => b.id === state.selectedBoardId,
        );
        if (!selectedBoard) {
          console.error(
            `Invalid board ID: "${state.selectedBoardId}" not found`,
          );
          return;
        }

        const selectedTask = selectedBoard.tasks.find((t) => t.id === taskId);
        if (!selectedTask) {
          console.error(`No task found with id: ${taskId}`);
          return;
        }
        Object.assign(selectedTask, changes);
      }),

    deleteTask: (taskId) =>
      set((state) => {
        const selectedBoard = state.boards.find(
          (b) => b.id === state.selectedBoardId,
        );
        if (!selectedBoard) {
          console.error(
            `Invalid board ID: "${state.selectedBoardId}" not found`,
          );
          return;
        }

        selectedBoard.tasks = selectedBoard.tasks.filter(
          (task) => task.id !== taskId,
        );
      }),
  })),
  { name: "todo" },
);
