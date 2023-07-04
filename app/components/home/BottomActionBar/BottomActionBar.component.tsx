import { FC } from "react";
import { BottomActionBarComponentProps } from "./BottomActionBar.interface";
import { Platform, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "../../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const BottomActionBarComponent: FC<
  BottomActionBarComponentProps
> = ({}) => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { bottom } = insets;

  return (
    <View className={`bg-primary ${Platform.OS === "ios" ? "-mb-4" : ""}`}>
      <View className="flex-row justify-around items-center mt-4">
        <IconButton
          mode="contained"
          containerColor={theme.colors.primaryContainer}
          icon="close-circle"
          iconColor={theme.colors.error}
          size={30}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          mode="contained"
          containerColor={theme.colors.primaryContainer}
          icon="content-save"
          iconColor={theme.colors.secondary}
          size={30}
          onPress={() => console.log("Pressed")}
        />
        <IconButton
          mode="contained"
          containerColor={theme.colors.primaryContainer}
          icon="check-circle"
          iconColor={theme.colors.onPrimaryContainer}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
};
