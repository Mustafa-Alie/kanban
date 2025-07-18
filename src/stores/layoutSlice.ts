import type { LayoutSliceType } from "@/types";

import { immer } from "zustand/middleware/immer";

//Layout slice for sidebar and Modals using immer (for immutability) and combine (for automatic type inferring):
export const createLayoutSlice = immer<LayoutSliceType>((set) => ({
  //Sidebar:
  isSidebarOpen: true,

  showSidebar: () =>
    set((state) => {
      state.isSidebarOpen = true;
    }),

  hideSidebar: () =>
    set((state) => {
      state.isSidebarOpen = false;
    }),

  // Add Board Modal:
  isAddBoardOpen: false,

  openAddBoardModal: () =>
    set((state) => {
      state.isAddBoardOpen = true;
    }),

  closeAddBoardModal: () =>
    set((state) => {
      state.isAddBoardOpen = false;
    }),

  //Boards vertical ellipsis
  isBoardEllipsisOpen: false,

  toggleBoardEllipsis: () =>
    set((state) => {
      state.isBoardEllipsisOpen = !state.isBoardEllipsisOpen;
    }),

  closeBoardEllipsis: () =>
    set((state) => {
      state.isBoardEllipsisOpen = false;
    }),

  //Edit Board Modal:
  isEditBoardOpen: false,

  closeEditBoardModal: () =>
    set((state) => {
      state.isEditBoardOpen = false;
    }),

  openEditBoardModal: () =>
    set((state) => {
      state.isEditBoardOpen = true;
    }),

  // Delete Baord Modal:
  isDeleteBoardOpen: false,

  closeDeleteBoardModal: () =>
    set((state) => {
      state.isDeleteBoardOpen = false;
    }),

  openDeleteBoardModal: () =>
    set((state) => {
      state.isDeleteBoardOpen = true;
    }),

  // Add Task Modal:
  isAddTaskOpen: false,

  openAddTaskModal: () =>
    set((state) => {
      state.isAddTaskOpen = true;
    }),

  closeAddTaskModal: () =>
    set((state) => {
      state.isAddTaskOpen = false;
    }),

  //Task Modal:
  isTaskModal: false,

  openTaskModal: () =>
    set((state) => {
      state.isTaskModal = true;
    }),

  closeTaskModal: () =>
    set((state) => {
      state.isTaskModal = false;
    }),

  //Task Ellipsis Modal:
  isTaskEllipsisOpen: false,

  toggleTaskEllipsisModal: () =>
    set((state) => {
      state.isTaskEllipsisOpen = !state.isTaskEllipsisOpen;
    }),

  closeTaskEllipsisModal: () =>
    set((state) => {
      state.isTaskEllipsisOpen = false;
    }),

  // Delete Task Modal:
  isDeleteTaskOpen: false,

  openDeleteTaskModal: () =>
    set((state) => {
      state.isDeleteTaskOpen = true;
    }),

  closeDeleteTaskModal: () =>
    set((state) => {
      state.isDeleteTaskOpen = false;
    }),

  // Mobile Chevron Modal:
  isMobileChevronOpen: false,

  openMobileChevronModal: () =>
    set((state) => {
      state.isMobileChevronOpen = true;
    }),

  closeMobileChevronModal: () =>
    set((state) => {
      state.isMobileChevronOpen = false;
    }),
}));
