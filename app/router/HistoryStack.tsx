import { FC } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AuthScreenStackParamList } from "./AuthStack";
import { OffersHistory } from "../screens/history/OffersHistory/OffersHistory.hooks";
import { HistoryOfferDetails } from "../screens/history/HistoryOfferDetails/HistoryOfferDetails.hooks";
import { HistoryOfferDetailsNavigationParams } from "../screens/history/HistoryOfferDetails/HistoryOfferDetails.interface";

export type HistoryScreenStackParamList = {
  OffersHistory: undefined;
  HistoryOfferDetails: HistoryOfferDetailsNavigationParams;
};

export type HistoryStackNavigatorType =
  StackNavigationProp<HistoryScreenStackParamList>;

const Stack = createStackNavigator<HistoryScreenStackParamList>();

export const HistoryStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OffersHistory" component={OffersHistory} />
      <Stack.Screen
        name="HistoryOfferDetails"
        component={HistoryOfferDetails}
      />
    </Stack.Navigator>
  );
};
