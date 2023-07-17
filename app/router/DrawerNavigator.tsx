import { FC } from "react";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { Home } from "../screens/home/Home.hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/theme";
import { Profile } from "../screens/profile/Profile.hooks";
import { HistoryStack } from "./HistoryStack";
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  const navigation = useNavigation();
  const theme = useAppTheme();

  function shouldRenderHeaderBackButtonInHistoryStack(
    route: RouteProp<ParamListBase, "HistoryStack">
  ) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "OffersHistory":
        return false;
      case "HistoryOfferDetails":
        return true;
    }
  }

  return (
    <Drawer.Navigator
      backBehavior="history"
      screenOptions={{
        drawerActiveBackgroundColor: theme.colors.primaryContainer,
        drawerActiveTintColor: theme.colors.onPrimaryContainer,
        drawerInactiveBackgroundColor: theme.colors.surface,
        drawerInactiveTintColor: theme.colors.onSurface,
        drawerStyle: { backgroundColor: theme.colors.surface },
        drawerType: "back",
        headerTitleAlign: "center",
        headerTintColor: theme.colors.onPrimary,
        headerBackground: () => (
          <LinearGradient
            className="flex-1"
            colors={[theme.colors.primary800, theme.colors.primary700]}
            locations={[0.3, 0.8]}
          />
        ),
        headerStatusBarHeight: 40,
      }}
    >
      <Drawer.Screen
        name={"Home"}
        component={Home}
        options={{
          drawerLabel: "Aplikuj",
        }}
      />
      <Drawer.Screen
        name={"HistoryStack"}
        component={HistoryStack}
        options={({ route }) => ({
          drawerLabel: "Historia Ofert",
          headerLeft: () =>
            shouldRenderHeaderBackButtonInHistoryStack(route) ? (
              <IconButton
                icon="arrow-left"
                iconColor={theme.colors.background}
                size={20}
                onPress={() => navigation.goBack()}
              />
            ) : (
              <DrawerToggleButton tintColor={theme.colors.background} />
            ),
        })}
      />
      <Drawer.Screen
        name={"Profile"}
        component={Profile}
        options={{ drawerLabel: "Profil" }}
      />
    </Drawer.Navigator>
  );
};
