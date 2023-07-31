import Axios from "axios";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData) => {
  const response = await Axios.post(
    "https://us-central1-job-positions-app.cloudfunctions.net/submit",
    formData
  );
  return response;
};
