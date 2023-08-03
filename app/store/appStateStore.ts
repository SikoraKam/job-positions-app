import { create } from "zustand";

export interface AppStateStore {
  appInitialized: boolean;
  setAppInitialized: (isInitialized: boolean) => void;

  resetAppStateSlice: () => void;
}

const initialState = {
  appInitialized: false,
};

export const useAppStateStore = create<AppStateStore>()((set) => ({
  ...initialState,
  setAppInitialized: (isInitialized: boolean) =>
    set((state) => ({ appInitialized: isInitialized })),
  resetAppStateSlice: () => {
    set({ ...initialState, appInitialized: true });
  },
}));
