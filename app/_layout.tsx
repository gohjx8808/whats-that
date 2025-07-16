import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: [
            styles.rootContainer,
            { backgroundColor: useTheme().colors.background },
          ],
        }}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
