import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect } from "react";

//Custom hook to handle clicking outside the Modal and pressing esc keyboard to close the Modal:
export default function useCloseModal(
  id: string,
  isModalOpen: boolean,
  closeModal: () => void,
) {
  const { modalRefs } = use(RefContext);
  const modalRef = modalRefs[id];

  // the custom hook won't work when task modal is open :D
  const isTaskModal = useStore((state) => state.isTaskModal);

  useEffect(() => {
    if (!isModalOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        modalRef?.current &&
        !modalRef.current.contains(target) &&
        !isTaskModal
      ) {
        closeModal();
      }
    }

    function handleEscKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal, isModalOpen, modalRef, modalRefs]);
}
