import { JobPositionDetails } from "../../types/positions.types";

export interface JobOfferScreenProps {
  positionDetails: JobPositionDetails;
}

export type CardValues = "description" | "company" | "salary";
