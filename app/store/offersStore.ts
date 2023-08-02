import { JobPositionDetails } from "../types/positions.types";
import { StateCreator } from "zustand";
import { StoreState } from "./useBoundStore";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OffersSlice {
  recommendedOffers: JobPositionDetails[];
  rejectedOffers: JobPositionDetails[];
  acceptedOffers: JobPositionDetails[];
  savedForFutureOffers: JobPositionDetails[];

  addToSavedForFuture: (offer: JobPositionDetails) => void;
  addToRejected: (offer: JobPositionDetails) => void;
  addToAccepted: (offer: JobPositionDetails) => void;

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) => void;

  resetOffersSlice: () => void;
}

const initialState = {
  recommendedOffers: [],
  rejectedOffers: [],
  acceptedOffers: [],
  savedForFutureOffers: [],
};

const removeFromRecommendedHelper = (
  state: OffersSlice,
  offerToRemove: JobPositionDetails
) => {
  return state.recommendedOffers.filter(
    (offer) => offer.id !== offerToRemove.id
  );
};

export const createOffersSlice: StateCreator<
  StoreState,
  [],
  [],
  OffersSlice
> = (set, get) => ({
  ...initialState,
  addToAccepted: (offer: JobPositionDetails) =>
    set((state) => ({
      acceptedOffers: [...state.acceptedOffers, offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),
  addToRejected: (offer: JobPositionDetails) =>
    set((state) => ({
      rejectedOffers: [...state.rejectedOffers, offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),
  addToSavedForFuture: (offer: JobPositionDetails) =>
    set((state) => ({
      savedForFutureOffers: [...state.savedForFutureOffers, offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) =>
    set((state) => ({ recommendedOffers: offers })),

  resetOffersSlice: () => {
    set((state) => ({
      ...initialState,
      acceptedOffers: state.acceptedOffers,
      rejectedOffers: state.rejectedOffers,
      savedForFutureOffers: state.savedForFutureOffers,
    }));
  },
});
