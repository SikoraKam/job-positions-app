import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { AppContainer } from "./app/AppContainer";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return <AppContainer />;
}
