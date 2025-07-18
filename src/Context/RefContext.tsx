import type { ModalRefsType, RefContextType, SetModalRefType } from "@/types";

import { createContext, useState } from "react";

export const RefContext = createContext<RefContextType>({
  modalRefs: {}, //obj containing all react ref for modals
  addModalRef: () => {},
});

//Context provider using React 19.1 syntax
export function RefProvider({ children }: { children: React.ReactNode }) {
  const [modalRefs, setModalRefs] = useState<ModalRefsType>({});

  // adds modal ref to modalRefs obj
  const addModalRef: SetModalRefType = (id, ref) => {
    setModalRefs((prev) => {
      if (prev[id] === ref) return prev;
      return { ...prev, [id]: ref };
    });
  };

  return <RefContext value={{ modalRefs, addModalRef }}>{children}</RefContext>;
}
