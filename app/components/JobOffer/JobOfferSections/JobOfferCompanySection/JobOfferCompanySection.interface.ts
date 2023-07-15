import { JobPositionDetails } from "../../../../types/positions.types";

export interface JobOfferCompanySectionProps
  extends Pick<
    JobPositionDetails,
    | "contactEmail"
    | "companyName"
    | "website"
    | "companySize"
    | "companyOfficeLocations"
  > {}
