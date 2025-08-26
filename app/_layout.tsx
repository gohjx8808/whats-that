import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme, View } from "react-native";
import {
  Button,
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../i18n";

const RootLayout = () => {
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const path = usePathname();
  const {
    i18n: { language },
  } = useTranslation();

  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(colorScheme || "light");
  }, [colorScheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const modeTheme = mode === "dark" ? MD3DarkTheme : MD3LightTheme;

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
        <View style={[styles.actionIconContainer, { top: top + 5 }]}>
          <Button
            mode="outlined"
            icon={() => (
              <FontAwesome
                name="globe"
                size={24}
                color={modeTheme.colors.onBackground}
              />
            )}
          >
            {language.toLocaleUpperCase()}
          </Button>
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
