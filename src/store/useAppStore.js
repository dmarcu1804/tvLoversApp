import { useContext } from "react";
import { StoreContext } from "./context";

export const useAppStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within StoreProvider");
  }
  return context;
};
