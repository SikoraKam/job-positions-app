import { FC } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { KeyboardAvoidingScrollViewInterface } from "./KeyboardAvoidingScrollView.interface";
import { styled } from "nativewind";

// const KeyboardAvoidingView = styled(RNKeyboardAvoidingScrollView, {
//   props: { contentContainerStyle: true },
// });

export const KeyboardAvoidingScrollView: FC<
  KeyboardAvoidingScrollViewInterface
> = ({
  keyboardAvoidingViewClassname,
  scrollViewClassname,
  children,
  behaviour,
}) => {
  return (
    <KeyboardAvoidingView
      className={keyboardAvoidingViewClassname}
      behavior={behaviour ?? "padding"}
    >
      <ScrollView
        className={scrollViewClassname}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 3 }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
