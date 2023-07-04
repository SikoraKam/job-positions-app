export type JobPositionDetails = {
  imageSource?: string;
  companyName: string;
  companyLogoImageSource?: string;
  positionName: string;
  location: string;
  description?: string;
  requirements?: string[];
  skills: string[];
  salary: number | string;
  remote?: boolean;
  responsibilities?: string[];
  additionalInfo?: string;
  contactEmail?: string;
  website?: string;
  benefits?: string[];
  partTime?: boolean;
};
