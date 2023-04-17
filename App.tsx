import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { AppContainer } from "./app/AppContainer";

export default function App() {
  useEffect(() => {
    (async () => {
      const users = await firestore()
        .collection("Users")
        .doc("Fdl1XP0hb8fZL3RzFjXk")
        .get();

      console.log(users);
    })();
  });

  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
