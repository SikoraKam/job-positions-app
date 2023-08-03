import { JobPositionDetails } from "../types/positions.types";
import { create } from "zustand";

export interface OffersStore {
  recommendedOffers: JobPositionDetails[];
  rejectedOffers: JobPositionDetails[] | undefined;
  acceptedOffers: JobPositionDetails[] | undefined;
  savedForFutureOffers: JobPositionDetails[] | undefined;

  addToSavedForFuture: (offer: JobPositionDetails) => void;
  addToRejected: (offer: JobPositionDetails) => void;
  addToAccepted: (offer: JobPositionDetails) => void;

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) => void;
  loadProcessedOffers: ({
    accepted,
    rejected,
    saved,
  }: {
    accepted?: JobPositionDetails[];
    rejected?: JobPositionDetails[];
    saved?: JobPositionDetails[];
  }) => void;

  resetOffersSlice: () => void;
}

const initialState = {
  recommendedOffers: [],
  rejectedOffers: undefined,
  acceptedOffers: undefined,
  savedForFutureOffers: undefined,
};

const removeFromRecommendedHelper = (
  state: OffersStore,
  offerToRemove: JobPositionDetails
) => {
  return state.recommendedOffers.filter(
    (offer) => offer.id !== offerToRemove.id
  );
};

export const useOffersStore = create<OffersStore>()((set) => ({
  ...initialState,
  addToAccepted: (offer: JobPositionDetails) =>
    set((state) => ({
      acceptedOffers: [...(state.acceptedOffers ?? []), offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),
  addToRejected: (offer: JobPositionDetails) =>
    set((state) => ({
      rejectedOffers: [...(state.rejectedOffers ?? []), offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),
  addToSavedForFuture: (offer: JobPositionDetails) =>
    set((state) => ({
      savedForFutureOffers: [...(state.savedForFutureOffers ?? []), offer],
      recommendedOffers: removeFromRecommendedHelper(state, offer),
    })),

  reinitializeRecommendedOffers: (offers: JobPositionDetails[]) =>
    set((state) => ({ recommendedOffers: offers })),

  loadProcessedOffers: (processedOffers) =>
    set(() => ({
      acceptedOffers: processedOffers?.accepted ?? [],
      rejectedOffers: processedOffers?.rejected ?? [],
      savedForFutureOffers: processedOffers?.saved ?? [],
    })),

  resetOffersSlice: () => {
    set((state) => ({
      ...initialState,
    }));
  },
}));
