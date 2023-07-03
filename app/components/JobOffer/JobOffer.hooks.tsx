import { FC } from "react";
import { JobOfferComponent } from "./JobOfferComponent";
import { JobPositionMock } from "../../mocks/JobPositionMock";

export const JobOffer: FC = () => {
  return <JobOfferComponent positionDetails={JobPositionMock} />;
};
