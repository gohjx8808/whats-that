import "../i18n";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  IconButton,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootLayout = () => {
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const path = usePathname();

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
        <IconButton
          icon={() => (
            <MaterialIcons
              name={mode === "dark" ? "dark-mode" : "light-mode"}
              size={30}
              color={modeTheme.colors.onBackground}
            />
          )}
          style={[styles.themeIcon, { top: top + 5 }]}
          size={24}
          onPress={toggleTheme}
        />
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
  themeIcon: {
    position: "absolute",
    right: 20,
  },
});
