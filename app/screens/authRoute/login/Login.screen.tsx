import { FC } from "react";
import { LoginScreenInterface } from "./Login.interface";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { ContentContainer } from "../../../components/shared/ContentContainer/ContentContainer";

export const LoginScreen: FC<LoginScreenInterface> = () => (
  <ContentContainer title="Login">
    <Text className="">HELLLO</Text>
    <Button
      className="bg-primaryContainer"
      icon="camera"
      mode="contained"
      onPress={() => console.log("Pressed")}
    >
      Press
    </Button>
  </ContentContainer>
);
