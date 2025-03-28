import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";

export interface LoginScreenInterface {
  control: Control<FormValues, any>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
  errors: any;
  navigateToRegistration(): void;
}

export type FormValues = {
  email: string;
  password: string;
};
