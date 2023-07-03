import { FC } from "react";
import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { logout } from "../../services/api/auth.service";

export const Profile: FC = () => {
  return (
    <ContentContainer withBackButton={false}>
      <View className="flex-1 justify-end">
        <Button
          onPress={logout}
          className="py-1"
          mode="contained"
          icon="logout"
        >
          Wyloguj się
        </Button>
      </View>
    </ContentContainer>
  );
};
