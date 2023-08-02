import Axios from "axios";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: EmailFormData) => {
  const response = await Axios.post("", formData);

  return response;
};
