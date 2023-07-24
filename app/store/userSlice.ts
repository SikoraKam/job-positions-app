import { StateCreator } from "zustand/esm/index";
import { StoreState } from "./useBoundStore";

export interface UserSlice {
  currentUserUid: string | undefined;
  setCurrentUserUid: (uid: string) => void;

  savedResumeUri: string | undefined;
  setSavedResumeUri: (uri: string) => void;

  resetUserSlice: () => void;
}

const initialState = {
  currentUserUid: undefined,
  savedResumeUri: undefined,
};

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (
  set,
  get
) => ({
  ...initialState,
  setCurrentUserUid: (uid) => set(() => ({ currentUserUid: uid })),
  setSavedResumeUri: (uri) => set(() => ({ savedResumeUri: uri })),
  resetUserSlice: () => {
    set(initialState);
  },
});
