import { FC } from "react";
import { JobOfferComponent } from "./JobOfferComponent";
import { JobOfferProps } from "./JobOffer.interface";

export const JobOffer: FC<JobOfferProps> = ({ offer }) => {
  return <JobOfferComponent positionDetails={offer} />;
};
