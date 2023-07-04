import { FC } from "react";
import { JobOfferComponent } from "./JobOfferComponent";
import { JobPositionsMock } from "../../mocks/JobPositionMock";

export const JobOffer: FC = () => {
  return <JobOfferComponent positionDetails={JobPositionsMock[1]} />;
};
