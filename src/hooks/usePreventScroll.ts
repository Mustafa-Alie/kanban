import { useEffect } from "react";

export default function usePreventScroll(isModalOpen: boolean) {
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
}
