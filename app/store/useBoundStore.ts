import { create } from "zustand";
import { createOffersSlice, OffersSlice } from "./offersSlice";
import { AppStateSlice, createAppStateSlice } from "./appStateSlice";

export type StoreState = OffersSlice & AppStateSlice;

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createOffersSlice(...a),
  ...createAppStateSlice(...a),
}));
