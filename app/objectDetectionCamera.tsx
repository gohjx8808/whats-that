import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, IconButton, Text, useTheme } from "react-native-paper";

const ObjectDetectionCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    const result = await cameraRef.current?.takePictureAsync();
    router.push({
      pathname: "/preview",
      params: { imageUrl: result?.uri, originScreen: "camera" },
    });
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={[
          styles.permissionContainer,
          { backgroundColor: colors.surfaceVariant },
        ]}
      >
        <Icon source="camera" size={100} />
        <Text style={styles.message} variant="headlineMedium">
          {t("CAMERA_ACCESS_TITLE")}
        </Text>
        <Text style={styles.message} variant="titleMedium">
          {t("CAMERA_ACCESS_MESSAGE")}
        </Text>
        <View style={styles.permissionButtonContainer}>
          <Button mode="contained" onPress={requestPermission}>
            {t("ALLOW")}
          </Button>
          <Button mode="outlined" onPress={() => router.back()}>
            {t("NOT_NOW")}
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView ratio="4:3" style={styles.camera} ref={cameraRef} />
      )}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.controlContainer}>
          <View style={styles.closeBtnContainer}>
            <IconButton
              onPress={() => router.replace("/")}
              icon="close"
              size={35}
              iconColor="white"
              containerColor="#00000080"
            />
          </View>
          <TouchableOpacity onPress={takePicture} style={styles.snapButton}>
            <Icon source="circle" size={70} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
  controlContainer: {
    flex: 1,
    marginVertical: 60,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
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
  snapButton: {
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 100,
  },
  closeBtnContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
});
