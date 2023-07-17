import { FC, useLayoutEffect } from "react";
import { HistoryOfferDetailsScreen } from "./HistoryOfferDetails.screen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  HistoryScreenStackParamList,
  HistoryStackNavigatorType,
} from "../../../router/HistoryStack";

export const HistoryOfferDetails: FC = () => {
  const navigation = useNavigation<HistoryStackNavigatorType>();

  const {
    params: { jobOffer },
  } = useRoute<RouteProp<HistoryScreenStackParamList, "HistoryOfferDetails">>();

  // useLayoutEffect(() => {
  //   navigation?.getParent()?.setOptions({ headerShown: false });
  // }, [navigation]);

  return <HistoryOfferDetailsScreen jobOffer={jobOffer} />;
};
