import { styled } from "nativewind";
import { TabBar } from "react-native-tab-view";

export const StyledTabBar = styled(TabBar, {
  props: {
    labelStyle: true,
    indicatorStyle: true,
  },
});
