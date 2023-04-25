import { ContentContainer } from "../../components/shared/ContentContainer/ContentContainer";
import { Button } from "react-native-paper";
import { logout } from "../../services/api/auth.service";
import { View } from "react-native";

export const HomeScreen = () => {
  return (
    <ContentContainer withBackButton={false}>
      <Button onPress={logout}>Sign out</Button>
    </ContentContainer>
  );
};
