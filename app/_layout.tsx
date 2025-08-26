import ThemeContext, { Mode } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    setMode(colorScheme || "light");
  }, [colorScheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const modeTheme = mode === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext value={{ mode, setMode: toggleTheme }}>
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
      </PaperProvider>
    </ThemeContext>
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
