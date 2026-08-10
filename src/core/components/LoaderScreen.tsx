import { ActivityIndicator, StyleSheet } from "react-native";
import { BackgroundView } from "./BackgroundView.component";

export const LoaderScreen = () => {
  return (
    <BackgroundView style={styles.container}>
      <ActivityIndicator size="large" />
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
