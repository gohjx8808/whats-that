import typographyStyles from "@/assets/styles/typographyStyles";
import ThemeContext from "@/contexts/ThemeContext";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { mode, setMode } = useContext(ThemeContext);
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const [status, requestPermission] = useMediaLibraryPermissions();
  const [isLanguageSwitcherOpen, setLanguageSwitcher] = useState(false);

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

  const onSwitchLanguage = (languageSelected: string) => {
    changeLanguage(languageSelected);
    setLanguageSwitcher(false);
  };

  return (
    <>
      <View style={[styles.actionIconContainer, { top: top + 20 }]}>
        <Menu
          visible={isLanguageSwitcherOpen}
          style={{ paddingTop: 45 }}
          contentStyle={{ borderRadius: 10 }}
          onDismiss={() => setLanguageSwitcher(false)}
          anchor={
            <Button
              contentStyle={{ backgroundColor: colors.background }}
              icon={() => (
                <FontAwesome
                  name="globe"
                  size={24}
                  color={colors.onBackground}
                />
              )}
              onPress={() => setLanguageSwitcher(true)}
            >
              {language.toLocaleUpperCase()}
            </Button>
          }
        >
          {SUPPORTED_LANGUAGES.map((language, index) => (
            <View key={language.value}>
              <Menu.Item
                onPress={() => onSwitchLanguage(language.value)}
                title={language.label}
              />
              {index < SUPPORTED_LANGUAGES.length - 1 && <Divider />}
            </View>
          ))}
        </Menu>
        <IconButton
          icon={() => (
            <MaterialIcons
              name={mode === "dark" ? "dark-mode" : "light-mode"}
              size={30}
              color={colors.onBackground}
            />
          )}
          contentStyle={{ backgroundColor: colors.background }}
          size={24}
          onPress={setMode}
        />
      </View>
      <View style={styles.rootContainer}>
        <Text
          variant="headlineMedium"
          style={[typographyStyles.boldText, typographyStyles.centerText]}
        >
          {t("MAIN_TITLE")}
        </Text>
        <Text variant="titleLarge" style={typographyStyles.centerText}>
          {t("MAIN_INTRODUCTION")}
        </Text>
        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="camera"
              size={100}
              onPress={() => router.push("/objectDetectionCamera")}
            />
            <Text style={typographyStyles.italicText}>
              {t("MAIN_CAMERA_INTRO")}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.buttonContainer}>
            <IconButton icon="image-outline" size={100} onPress={pickImage} />
            <Text style={typographyStyles.italicText}>
              {t("MAIN_GALLERY_INTRO")}
            </Text>
          </View>
        </View>
      </View>
    </>
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
  actionIconContainer: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
