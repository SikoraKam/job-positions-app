import { JobPositionDetails } from "../../../../types/positions.types";

export interface JobOfferSalarySectionInterface
  extends Pick<JobPositionDetails, "salary" | "benefits"> {}
