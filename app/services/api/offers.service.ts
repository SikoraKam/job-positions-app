import Axios from "axios/index";
import { JobPositionDetails } from "../../types/positions.types";
import firestore from "@react-native-firebase/firestore";
import { FIRESTORE_COLLECTIONS } from "../../const/firestore";
import { showToastError } from "../../utils/toast";
import { JobPositionsMock } from "../../mocks/JobPositionMock";

export const getRecommendedJobs = async (
  resumeUrl: string,
  positions: JobPositionDetails[]
) => {
  // const response = await Axios.post(
  //   "",
  //   { resumeUrl, positions }
  // );
  //
  // return response.data;

  return JobPositionsMock;
};

export const postJobPosition = async (position: JobPositionDetails) => {
  const positionsRef = firestore().collection(FIRESTORE_COLLECTIONS.POSITIONS);
  const { id, ...rest } = position;
  try {
    await positionsRef.add(rest);
  } catch (e: any) {
    showToastError(e.message);
    console.error("Positions post failed", e.message);
  }
};

export const getAvailableJobPositions = async (): Promise<
  JobPositionDetails[]
> => {
  const positionsRef = firestore().collection(FIRESTORE_COLLECTIONS.POSITIONS);
  const positions = await positionsRef.get();
  return positions.docs.map((doc) => ({
    ...(doc.data() as JobPositionDetails),
    id: doc.id,
  }));
};

export const getOffersByIds = async (ids: string[]) => {
  const positionsRef = firestore().collection(FIRESTORE_COLLECTIONS.POSITIONS);
  const queryRef = await positionsRef
    .where(firestore.FieldPath.documentId(), "in", ids)
    .get();

  return queryRef.docs.map((doc) => ({
    ...(doc.data() as JobPositionDetails),
    id: doc.id,
  }));
};
