import { create } from "zustand";
import { createLayoutSlice } from "@/stores/layoutSlice";
import type { AllSlicesType } from "@/types";
import { createTodoSlice } from "@/stores//todoSlice";

export const useStore = create<AllSlicesType>()((...a) => ({
  ...createTodoSlice(...a),
  ...createLayoutSlice(...a),
}));
