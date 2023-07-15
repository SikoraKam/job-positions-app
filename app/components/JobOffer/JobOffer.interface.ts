import { JobPositionDetails } from "../../types/positions.types";

export interface JobOfferProps {
  offer: JobPositionDetails;
}

export interface JobOfferScreenProps {
  positionDetails: JobPositionDetails;
}

export type CardValues = "description" | "company" | "salary";
