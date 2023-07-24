import { FC } from "react";
import { CustomInputInterface } from "./CustomInput.interface";
import { TextInput, useTheme } from "react-native-paper";
import CustomText from "../CustomText/CustomText";

export const CustomInput: FC<CustomInputInterface> = ({
  label,
  onChange,
  value,
  onBlur,
  errorLabel,
  error,
  errorLabelClassName,
  secure,
  classname,
}) => {
  const theme = useTheme();

  return (
    <>
      <TextInput
        autoCapitalize="none"
        mode="outlined"
        label={label}
        onChangeText={onChange}
        selectionColor={theme.colors.primary}
        value={value}
        onBlur={onBlur}
        secureTextEntry={secure}
        outlineColor={theme.colors.secondary}
        className={classname}
      />
      {error && (
        <CustomText textClassName={`text-error ${errorLabelClassName}`}>
          {errorLabel}
        </CustomText>
      )}
    </>
  );
};
