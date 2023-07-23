import { create } from "zustand";
import { createOffersSlice, OffersSlice } from "./offersSlice";
import { AppStateSlice, createAppStateSlice } from "./appStateSlice";
import { createUserSlice, UserSlice } from "./userSlice";

export type StoreState = OffersSlice & AppStateSlice & UserSlice;

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createOffersSlice(...a),
  ...createAppStateSlice(...a),
  ...createUserSlice(...a),
}));
