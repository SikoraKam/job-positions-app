export interface CustomInputInterface {
  label?: string;
  onChange: VoidFunction;
  value: string;
  onBlur?: VoidFunction;
  errorLabel?: string;
  error?: boolean;
  errorLabelClassName?: string;
  secure?: boolean;
  classname?: string;
}
