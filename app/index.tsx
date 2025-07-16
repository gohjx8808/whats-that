import typographyStyles from "@/assets/styles/typographyStyles";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function Index() {
  return (
    <View style={styles.rootContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 30,
    alignItems:'center'
  },
});
