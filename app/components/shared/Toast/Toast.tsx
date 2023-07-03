import {
  ErrorToast,
  SuccessToast,
  ToastConfigParams,
} from "react-native-toast-message";

export const toastConfig = {
  error: (props: ToastConfigParams<any>) => {
    return <ErrorToast {...props} text1NumberOfLines={0} />;
  },
  success: (props: ToastConfigParams<any>) => {
    return <SuccessToast {...props} text1NumberOfLines={0} />;
  },
};
