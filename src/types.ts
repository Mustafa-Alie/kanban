//Context Types:
export type ThemeType = "light" | "dark";

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export type TriggerRefsType = Record<
  string,
  React.RefObject<HTMLButtonElement | null>
>;
export type ModalRefsType = Record<
  string,
  React.RefObject<HTMLDivElement | null>
>;

export type SetModalRefType = (
  id: string,
  ref: React.RefObject<HTMLDivElement | null>,
) => void;
export type SetTriggerRefType = (
  id: string,
  ref: React.RefObject<HTMLButtonElement | null>,
) => void;

export type RefContextType = {
  modalRefs: ModalRefsType;
  addModalRef: SetModalRefType;
};

///////////////////////////////////////////////////////

//Initial Data Types:
export type ProgressType =
  | []
  | [string]
  | [string, string]
  | [string, string, string];

export type TaskType = {
  id: string;
  title: string;
  desc: string;
  due: Date | null;
  progress: string;
};

export type BoardType = {
  id: string;
  title: string;
  progress: ProgressType;
  tasks: TaskType[];
};

export type InitDataType = { boards: BoardType[] };

///////////////////////////////////////////////////////

//Zustand Types:

export type LayoutSliceType = {
  isSidebarOpen: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;

  isAddBoardOpen: boolean;
  openAddBoardModal: () => void;
  closeAddBoardModal: () => void;

  isBoardEllipsisOpen: boolean;
  toggleBoardEllipsis: () => void;
  closeBoardEllipsis: () => void;

  isEditBoardOpen: boolean;
  closeEditBoardModal: () => void;
  openEditBoardModal: () => void;

  isDeleteBoardOpen: boolean;
  closeDeleteBoardModal: () => void;
  openDeleteBoardModal: () => void;

  isAddTaskOpen: boolean;
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;

  isTaskModal: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;

  isTaskEllipsisOpen: boolean;
  toggleTaskEllipsisModal: () => void;
  closeTaskEllipsisModal: () => void;

  isDeleteTaskOpen: boolean;
  openDeleteTaskModal: () => void;
  closeDeleteTaskModal: () => void;

  isMobileChevronOpen: boolean;
  openMobileChevronModal: () => void;
  closeMobileChevronModal: () => void;
};

export type TodoSliceType = {
  boards: BoardType[];

  addBoard: (
    boardId: string,
    boardTitle: string,
    boardProgressArr: ProgressType,
  ) => void;

  editBoard: (
    boardId: string,
    boardTitle: string,
    boardProgressArr: ProgressType,
    newTasks: TaskType[],
  ) => void;

  deleteBoard: (boardID: string) => void;

  selectedBoardId: string | null;
  setSelectedBoardId: (id: string) => void;

  addTask: (newTask: TaskType) => void;

  selectedTaskId: string | null;
  setSelectedTaskId: (id: string) => void;

  editTask: (id: string, changes: Partial<TaskType>) => void;

  deleteTask: (taskId: string) => void;
};

export type AllSlicesType = TodoSliceType & LayoutSliceType;
