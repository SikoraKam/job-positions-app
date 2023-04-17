import { FC } from "react";
import { LoginScreenInterface } from "./Login.interface";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Button } from "react-native-paper";

export const LoginScreen: FC<LoginScreenInterface> = () => (
  <SafeAreaView className="flex-1 bg-blue-500">
    <Text className="">HELLLO</Text>
    <Button
      className="flex-1"
      icon="camera"
      mode="contained"
      onPress={() => console.log("Pressed")}
    >
      Press
    </Button>
  </SafeAreaView>
);
