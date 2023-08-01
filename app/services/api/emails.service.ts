import Axios from "axios";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData) => {
  // const response = await Axios.post(
  //   "https://us-central1-job-positions-app.cloudfunctions.net/submit",
  //   formData
  // );

  const resumeUrl =
    "https://firebasestorage.googleapis.com/v0/b/job-positions-app.appspot.com/o/junior-sql-developer2%20%20-%20Template%2014.pdf_1690197620.261?alt=media&token=0e6afdb8-7821-4916-ae22-6ec9873be0fd";
  const response = await Axios.post(
    "https://on-request-example-srjtptp7ba-uc.a.run.app",
    { ...formData, resumeUrl }
  );
  console.log("RESPONSE", response);
  return response;
};
