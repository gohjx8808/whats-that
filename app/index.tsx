import typographyStyles from "@/assets/styles/typographyStyles";
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";

export default function Index() {
  const [status, requestPermission] = useMediaLibraryPermissions();

  const pickImage = async () => {
    let permissionGranted = status?.granted;
    if (!permissionGranted) {
      permissionGranted = (await requestPermission()).granted;
    }

    if (permissionGranted) {
      const result = await launchImageLibraryAsync();

      if (!result.canceled) {
        router.push({
          pathname: "/preview",
          params: { imageUrl: result.assets[0].uri },
        });
      }
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text variant="displaySmall" style={typographyStyles.boldText}>
        What&apos;s That?
      </Text>
      <Text variant="titleLarge" style={typographyStyles.centerText}>
        Snap or upload a photo to instantly identify objects around you.
      </Text>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="camera"
          size={100}
          onPress={() => router.push("/objectDetectionCamera")}
        />
        <Divider style={styles.divider} />
        <IconButton icon="image-outline" size={100} onPress={pickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 20,
  },
  divider: {
    width: "100%",
    height: 0.5,
  },
  buttonContainer: {
    gap: 30,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
});
