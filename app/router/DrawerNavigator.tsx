import { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { Home } from "../screens/home/Home.hooks";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/theme";
import { Profile } from "../screens/profile/Profile.hooks";
import { OffersHistory } from "../screens/offersHistory/OffersHistory.hooks";

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  const theme = useAppTheme();

  return (
    <Drawer.Navigator
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
        name={"OffersHistory"}
        component={OffersHistory}
        options={{
          drawerLabel: "Historia Ofert",
        }}
      />
      <Drawer.Screen
        name={"Profile"}
        component={Profile}
        options={{ drawerLabel: "Profil" }}
      />
    </Drawer.Navigator>
  );
};
