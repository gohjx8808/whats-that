import typographyStyles from "@/assets/styles/typographyStyles";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

export default function Index() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text variant="displaySmall" style={typographyStyles.boldText}>
        What&apos;s That?
      </Text>
      <Text variant="titleLarge" style={typographyStyles.centerText}>
        Identify objects around you using your camera.
      </Text>
      <IconButton
        icon="camera-outline"
        size={100}
        onPress={() => console.log("Pressed")}
      />
    </View>
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
