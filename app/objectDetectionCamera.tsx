import GeneralView from "@/components/GeneralView";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";

const ObjectDetectionCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { colors } = useTheme();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <GeneralView style={styles.container}>
        <View
          style={[
            styles.permissionContainer,
            { backgroundColor: colors.surfaceVariant },
          ]}
        >
          <Icon source="camera" size={100} />
          <Text style={styles.message} variant="headlineMedium">
            Allow Camera Access?
          </Text>
          <Text style={styles.message} variant="titleMedium">
            We need access to your camera to let you take photo.
          </Text>
          <View style={styles.permissionButtonContainer}>
            <Button mode="contained" onPress={requestPermission}>
              Allow
            </Button>
            <Button mode="outlined" onPress={() => router.back()}>
              Not Now
            </Button>
          </View>
        </View>
      </GeneralView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default ObjectDetectionCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  permissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  permissionButtonContainer: {
    width: "100%",
    gap: 10,
  },
});
