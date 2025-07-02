import typographyStyles from "@/assets/styles/typographyStyles";
import GeneralView from "@/components/GeneralView";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function Index() {
  return (
    <GeneralView style={styles.rootContainer}>
      <Text variant="displaySmall" style={typographyStyles.boldText}>
        What&apos;s That?
      </Text>
      <Text variant="titleLarge" style={typographyStyles.centerText}>
        Identify objects around you using your camera.
      </Text>
      <IconButton
        icon="camera-outline"
        size={100}
        onPress={() => router.push("/objectDetectionCamera")}
      />
    </GeneralView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});
