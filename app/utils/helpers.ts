import { getAvailableJobPositions } from "../services/api/offers.service";
import { JobPositionDetails } from "../types/positions.types";

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export const filterAvailablePositionsWhichAreNotProcessedByUser = async (
  processedOffers: JobPositionDetails[]
) => {
  const allJobPositions = await getAvailableJobPositions();
  return allJobPositions.filter((position) =>
    processedOffers.every((processedOffer) => processedOffer.id !== position.id)
  );
};
