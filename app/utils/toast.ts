import Toast from "react-native-toast-message";

export const showToastError = (text: string) => {
  Toast.show({ type: "error", text1: text });
};

export const showToastInfo = (text: string) => {
  Toast.show({ type: "info", text1: text });
};

export const showToastSuccess = (text: string) => {
  Toast.show({ type: "success", text1: text });
};
