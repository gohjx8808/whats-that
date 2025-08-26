import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  Menu,
  PaperProvider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SUPPORTED_LANGUAGES } from "../i18n";

const RootLayout = () => {
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const path = usePathname();
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const [mode, setMode] = useState("light");
  const [isLanguageSwitcherOpen, setLanguageSwitcher] = useState(false);

  useEffect(() => {
    setMode(colorScheme || "light");
  }, [colorScheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const modeTheme = mode === "dark" ? MD3DarkTheme : MD3LightTheme;

  const onSwitchLanguage = (languageSelected: string) => {
    changeLanguage(languageSelected);
    setLanguageSwitcher(false);
  };

  return (
    <PaperProvider theme={modeTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: [
            styles.rootContainer,
            { backgroundColor: modeTheme.colors.background },
          ],
        }}
      />
      {path !== "/objectDetectionCamera" && (
        <View style={[styles.actionIconContainer, { top: top + 55 }]}>
          <Menu
            visible={isLanguageSwitcherOpen}
            style={{ paddingTop: 45 }}
            contentStyle={{ borderRadius: 10 }}
            onDismiss={() => setLanguageSwitcher(false)}
            anchor={
              <Button
                mode="outlined"
                icon={() => (
                  <FontAwesome
                    name="globe"
                    size={24}
                    color={modeTheme.colors.onBackground}
                  />
                )}
                onPress={() => setLanguageSwitcher(true)}
              >
                {language.toLocaleUpperCase()}
              </Button>
            }
          >
            {SUPPORTED_LANGUAGES.map((language, index) => (
              <>
                <Menu.Item
                  onPress={() => onSwitchLanguage(language.value)}
                  title={language.label}
                />
                {index < SUPPORTED_LANGUAGES.length - 1 && <Divider />}
              </>
            ))}
          </Menu>
          <IconButton
            icon={() => (
              <MaterialIcons
                name={mode === "dark" ? "dark-mode" : "light-mode"}
                size={30}
                color={modeTheme.colors.onBackground}
              />
            )}
            size={24}
            onPress={toggleTheme}
          />
        </View>
      )}
    </PaperProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
  },
  actionIconContainer: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
