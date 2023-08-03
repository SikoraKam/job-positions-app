export interface UserContactDetails {
  email: string;
  name: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  resumeFileName?: string;
  resumeUrl?: string;
  acceptedOffersIds?: string[];
  rejectedOffersIds?: string[];
  savedOffersIds?: string[];
}
