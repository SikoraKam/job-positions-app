import { UserData } from "../types/user.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserStore {
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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentUserUid: (uid) => set(() => ({ currentUserUid: uid })),
      setSavedResumeUri: (uri) => set(() => ({ savedResumeUri: uri })),
      setUserData: (data) => set(() => ({ userData: data })),
      resetUserSlice: () => {
        set(initialState);
      },
    }),
    {
      name: "user-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
