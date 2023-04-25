import { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import { Home } from "../screens/home/Home.hooks";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../theme/theme";

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
      }}
    >
      <Drawer.Screen
        name={"Home"}
        component={Home}
        options={{ drawerLabel: "Aplikuj" }}
      />
      <Drawer.Screen
        name={"Profile"}
        component={() => <View />}
        options={{ drawerLabel: "Profil" }}
      />
    </Drawer.Navigator>
  );
};
