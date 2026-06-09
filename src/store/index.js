import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { showsSlice } from "./slices/showsSlice";
import { filtersSlice } from "./slices/filtersSlice";
import { castSlice } from "./slices/castSlice";

export const useStore = create(
  devtools((set) => ({
    ...showsSlice(set),
    ...filtersSlice(set),
    ...castSlice(set),
  })),
);
