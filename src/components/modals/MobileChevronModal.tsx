import crossIcon from "@/assets/images/icon-cross.svg";

import BoardList from "@/components/UI/BoardList";
import ThemeToggler from "@/components/UI/ThemeToggler";
import { RefContext } from "@/Context/RefContext";
import { useStore } from "@/stores/useStore";
import { use, useEffect, useRef } from "react";

export const MOBILE_CHEVRON_MODAL_ID = "mobileChevronModalId";

export default function MobileChevronModal() {
  const closeMobileChevronModal = useStore(
    (state) => state.closeMobileChevronModal,
  );

  const { addModalRef } = use(RefContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) addModalRef(MOBILE_CHEVRON_MODAL_ID, modalRef);
  }, [addModalRef]);

  return (
    <section className="backdrop-blur-tiny fixed inset-0 z-10 flex items-center justify-center bg-black/10">
      <div
        className="flex flex-col rounded-2xl bg-white py-8 pe-4 dark:bg-gray-800"
        id={MOBILE_CHEVRON_MODAL_ID}
        ref={modalRef}
      >
        <button
          type="button"
          className="ms-auto cursor-pointer"
          onClick={closeMobileChevronModal}
        >
          <img
            alt="cross icon for closing"
            src={crossIcon}
            className="h-4 w-4"
            onClick={() => {}}
          />
        </button>
        <BoardList />

        <div className="mt-6 ps-4">
          <ThemeToggler />
        </div>
      </div>
    </section>
  );
}
