import { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name={"Home"} component={null} />
    </Drawer.Navigator>
  );
};
