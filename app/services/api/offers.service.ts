import Axios from "axios/index";
import { JobPositionsMock } from "../../mocks/JobPositionMock";

export const getRecommendedJobs = async () => {
  const resumeUrl =
    "https://firebasestorage.googleapis.com/v0/b/job-positions-app.appspot.com/o/junior-sql-developer2%20%20-%20Template%2014.pdf_1690197620.261?alt=media&token=0e6afdb8-7821-4916-ae22-6ec9873be0fd";
  const response = await Axios.post(
    "https://on-request-example-srjtptp7ba-uc.a.run.app",
    { resumeUrl, positions: JobPositionsMock }
  );

  console.log("RESPONSE ___", response);
  return response;
};
