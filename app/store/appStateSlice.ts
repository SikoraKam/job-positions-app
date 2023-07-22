import { StateCreator } from "zustand/esm";
import { StoreState } from "./useBoundStore";

export interface AppStateSlice {
  appInitialized: boolean;
  setAppInitialized: (isInitialized: boolean) => void;

  currentUserUId: string | undefined;
  setCurrentUserUid: (uid: string) => void;

  resetAppStateSlice: () => void;
}

const initialState = {
  appInitialized: false,
  currentUserUId: undefined,
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
  setCurrentUserUid: (uid) => set(() => ({ currentUserUId: uid })),
  resetAppStateSlice: () => {
    set({ ...initialState, appInitialized: true });
  },
});
