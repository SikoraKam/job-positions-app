import { JobPositionDetails } from "../../../types/positions.types";

export interface OffersHistoryProps {}

export interface OffersHistoryScreenProps {
  acceptedOffers: JobPositionDetails[];
  rejectedOffers: JobPositionDetails[];
  savedOffers: JobPositionDetails[];
}
