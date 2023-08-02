import { StateCreator } from "zustand/esm/index";
import { StoreState } from "./useBoundStore";
import { UserData } from "../types/user.types";

export interface UserSlice {
  currentUserUid: string | undefined;
  setCurrentUserUid: (uid: string) => void;

  savedResumeUri: string | undefined;
  setSavedResumeUri: (uri: string) => void;

  userData: UserData | undefined;
  setUserData: (data: UserData) => void;

  resetUserSlice: () => void;
}

const initialState = {
  currentUserUid: undefined,
  savedResumeUri: undefined,
  userData: undefined,
};

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (
  set,
  get
) => ({
  ...initialState,
  setCurrentUserUid: (uid) => set(() => ({ currentUserUid: uid })),
  setSavedResumeUri: (uri) => set(() => ({ savedResumeUri: uri })),
  setUserData: (data) => set(() => ({ userData: data })),
  resetUserSlice: () => {
    set(initialState);
  },
});
