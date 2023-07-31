import { JobPositionDetails } from "../types/positions.types";

export const emailApplicationMessageConstructor = (
  offerData: JobPositionDetails,
  userData: { nameAndLastName: string; resumeUri: string; email: string }
) => {
  const message = `Nowa aplikacja na ofertę ${offerData.positionName} od ${userData.nameAndLastName}. \n 
  Skontaktuj się z kandydatem pod adresem ${userData.email}
  Link do CV kandydata: ${userData.resumeUri}`;

  return {
    name: userData.nameAndLastName,
    email: offerData.contactEmail,
    message,
  };
};
