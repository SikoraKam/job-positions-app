import { FC } from "react";
import { HistoryOfferDetailsScreenProps } from "./HistoryOfferDetails.interface";
import { ContentContainer } from "../../../components/shared/ContentContainer/ContentContainer";
import { JobOffer } from "../../../components/JobOffer/JobOffer.hooks";

export const HistoryOfferDetailsScreen: FC<HistoryOfferDetailsScreenProps> = ({
  jobOffer,
}) => {
  return (
    <ContentContainer
      classname="px-0"
      withHeader={false}
      safeAreaEdges={["bottom"]}
    >
      <JobOffer offer={jobOffer} />
    </ContentContainer>
  );
};
