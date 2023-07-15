import { JobPositionDetails } from "../../../../types/positions.types";

export interface JobOfferDescriptionProps
  extends Pick<
    JobPositionDetails,
    | "description"
    | "skills"
    | "remote"
    | "responsibilities"
    | "partTime"
    | "requirements"
    | "seniority"
  > {}
