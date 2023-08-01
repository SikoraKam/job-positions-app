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
  const response = await Axios.post(
    "https://on-request-example-srjtptp7ba-uc.a.run.app",
    { resumeUrl, positions }
  );

  return response.data;
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
  // return positions.docs.map((doc) => ({
  //   ...(doc.data() as JobPositionDetails),
  //   id: doc.id,
  // }));
  return JobPositionsMock.map((doc) => ({
    ...(doc as JobPositionDetails),
    id: doc.id,
  }));
};
