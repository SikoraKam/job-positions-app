import { JobPositionDetails } from "../types/positions.types";
import { StateCreator } from "zustand";
import { StoreState } from "./useBoundStore";

export interface OffersSlice {
  recommendedOffers: JobPositionDetails[];
  rejectedOffers: JobPositionDetails[];
  acceptedOffers: JobPositionDetails[];
  savedForFutureOffers: JobPositionDetails[];

  addToSavedForFuture: (offer: JobPositionDetails) => void;
  addToRejected: (offer: JobPositionDetails) => void;
  addToAccepted: (offer: JobPositionDetails) => void;

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) => void;
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
      acceptedOffers: [...state.rejectedOffers, offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),
  addToSavedForFuture: (offer: JobPositionDetails) =>
    set((state) => ({
      acceptedOffers: [...state.savedForFutureOffers, offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) =>
    set((state) => ({ recommendedOffers: offers })),
});
