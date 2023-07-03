import { Control, UseFormHandleSubmit } from "react-hook-form";

export interface RegisterScreenProps {
  control: Control<FormValues, any>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
  errors: any;
}

export type FormValues = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
