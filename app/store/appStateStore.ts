import { StateCreator } from "zustand/esm";
import { StoreState } from "./useBoundStore";

export interface AppStateSlice {
  appInitialized: boolean;
  setAppInitialized: (isInitialized: boolean) => void;

  resetAppStateSlice: () => void;
}

const initialState = {
  appInitialized: false,
};

export const createAppStateSlice: StateCreator<
  StoreState,
  [],
  [],
  AppStateSlice
> = (set, get) => ({
  ...initialState,
  setAppInitialized: (isInitialized: boolean) =>
    set((state) => ({ appInitialized: isInitialized })),
  resetAppStateSlice: () => {
    set({ ...initialState, appInitialized: true });
  },
});
