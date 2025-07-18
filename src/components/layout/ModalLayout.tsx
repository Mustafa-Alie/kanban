import ShowSidebarBtn from "@/components/UI/ShowSidebarBtn.tsx";
import BoardEllipsisModal, {
  BOARD_ELLIPSIS_MODAL_ID,
} from "@/components/modals/BoardEllipsisModal.tsx";
import DeleteBoardModal, {
  DELETE_BOARD_MODAL_ID,
} from "@/components/modals/DeleteBoardModal";

import AddTaskModal from "@/components/modals/AddTaskModal";
// import {ADD_TASK_MODAL_ID} from "@/components/modals/AddTaskModal";

import TaskModal, { TASK_MODAL_ID } from "@/components/modals/TaskModal";
import DeleteTaskModal from "@/components/modals/DeleteTaskModal";

import EditBoardModal, {
  EDIT_BOARD_MODAL_ID,
} from "@/components/modals/EditBoardModal";

import { useStore } from "@/stores/useStore";
import useCloseModal from "@/hooks/useCloseModal.ts";
import MobileChevronModal, {
  MOBILE_CHEVRON_MODAL_ID,
} from "@/components/modals/MobileChevronModal";
import AddBoardModal, {
  ADD_BOARD_MODAL_ID,
} from "@/components/modals/AddBoardModal";
import usePreventScroll from "@/hooks/usePreventScroll";

export default function ModalLayout() {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const isAddBoardOpen = useStore((state) => state.isAddBoardOpen);
  const closeAddBoardModal = useStore((state) => state.closeAddBoardModal);
  useCloseModal(ADD_BOARD_MODAL_ID, isAddBoardOpen, closeAddBoardModal);
  usePreventScroll(isAddBoardOpen);

  const isBoardEllipsisOpen = useStore((state) => state.isBoardEllipsisOpen);
  const closeBoardEllipsis = useStore((state) => state.closeBoardEllipsis);
  useCloseModal(
    BOARD_ELLIPSIS_MODAL_ID,
    isBoardEllipsisOpen,
    closeBoardEllipsis,
  );

  const isEditBoardOpen = useStore((state) => state.isEditBoardOpen);
  const closeEditBoardModal = useStore((state) => state.closeEditBoardModal);
  useCloseModal(EDIT_BOARD_MODAL_ID, isEditBoardOpen, closeEditBoardModal);
  usePreventScroll(isEditBoardOpen);

  const isDeleteBoardOpen = useStore((state) => state.isDeleteBoardOpen);
  const closeDeleteBoardModal = useStore(
    (state) => state.closeDeleteBoardModal,
  );
  useCloseModal(
    DELETE_BOARD_MODAL_ID,
    isDeleteBoardOpen,
    closeDeleteBoardModal,
  );
  usePreventScroll(isDeleteBoardOpen);

  const isAddTaskOpen = useStore((state) => state.isAddTaskOpen);
  // const closeAddTaskModal = useStore((state) => state.closeAddTaskModal);
  // useCloseModal(ADD_TASK_MODAL_ID, isAddTaskOpen, closeAddTaskModal);
  usePreventScroll(isAddTaskOpen);

  const isTaskModal = useStore((state) => state.isTaskModal);
  const closeTaskModal = useStore((state) => state.closeTaskModal);
  useCloseModal(TASK_MODAL_ID, isTaskModal, closeTaskModal);
  usePreventScroll(isTaskModal);

  const isDeleteTaskOpen = useStore((state) => state.isDeleteTaskOpen);

  const isMobileChevronOpen = useStore((state) => state.isMobileChevronOpen);
  const closeMobileChevronModal = useStore(
    (state) => state.closeMobileChevronModal,
  );
  useCloseModal(
    MOBILE_CHEVRON_MODAL_ID,
    isMobileChevronOpen,
    closeMobileChevronModal,
  );
  usePreventScroll(isMobileChevronOpen);

  return (
    <>
      {!isSidebarOpen && <ShowSidebarBtn />}

      {isAddBoardOpen && <AddBoardModal />}

      {isBoardEllipsisOpen && <BoardEllipsisModal />}

      {isEditBoardOpen && <EditBoardModal />}

      {isDeleteBoardOpen && <DeleteBoardModal />}

      {isAddTaskOpen && <AddTaskModal />}

      {isTaskModal && <TaskModal />}

      {isDeleteTaskOpen && <DeleteTaskModal />}

      {isMobileChevronOpen && <MobileChevronModal />}
    </>
  );
}
