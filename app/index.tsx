import typographyStyles from "@/assets/styles/typographyStyles";
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";

export default function Index() {
  const { t } = useTranslation();
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
          params: { imageUrl: result.assets[0].uri, originScreen: "gallery" },
        });
      }
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text
        variant="headlineMedium"
        style={[typographyStyles.boldText, typographyStyles.centerText]}
      >
        Discover What&apos;s Around You {t("test")}
      </Text>
      <Text variant="titleLarge" style={typographyStyles.centerText}>
        Snap a photo or choose one from your gallery — we&apos;ll tell you what
        it is in seconds.
      </Text>
      <View style={styles.actionContainer}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="camera"
            size={100}
            onPress={() => router.push("/objectDetectionCamera")}
          />
          <Text style={typographyStyles.italicText}>
            Snap and discover instantly
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.buttonContainer}>
          <IconButton icon="image-outline" size={100} onPress={pickImage} />
          <Text style={typographyStyles.italicText}>
            Choose an existing photo
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    gap: 25,
  },
  divider: {
    width: "100%",
    height: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
  actionContainer: {
    gap: 30,
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
});
