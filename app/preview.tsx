import { CustomModal } from "@/components/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Image as RNImage, ImageSize } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Config from "react-native-config";

interface YoloResponse {
  name: string;
  class: number;
  confidence: number;
  box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

type PreviewParams = {
  imageUrl: string;
  originScreen: "camera" | "gallery";
};

const Preview = () => {
  const { imageUrl, originScreen } = useLocalSearchParams<PreviewParams>();

  const [scale, setScale] = useState({ height: 0, width: 0 });
  const [detectResult, setDetectResult] = useState<YoloResponse[]>([]);
  const [renderedTopPadding, setRenderedTopPadding] = useState(0);
  const [actualImageDimension, setActualImageDimension] = useState<ImageSize>({
    height: 0,
    width: 0,
  });
  const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const getImageDimension = async () => {
      const dimension = await RNImage.getSize(imageUrl);
      setActualImageDimension(dimension);
    };
    getImageDimension();
  }, [imageUrl]);

  const detectObject = async () => {
    setIsLoading(true);
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1];

    const formData = new FormData();
    formData.append("file", {
      uri: imageUrl,
      name: filename,
      type: `image/${filename.split(".").pop()}`,
    } as any);
    formData.append("lang", language);

    try {
      const response = await fetch(
        `${Config.API_URL}/object-detection/detect`,
        {
          method: "POST",

          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const results = await response.json();
      if (results.length === 0) {
        setIsEmptyModalVisible(true);
      }
      setDetectResult(results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onRetry = () => {
    setIsEmptyModalVisible(false);
    router.push(originScreen === "camera" ? "/objectDetectionCamera" : "/");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={t("PREVIEW_TITLE")} />
      </Appbar.Header>
      <View style={[styles.contentContainer, { paddingBottom: bottom }]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={imageUrl}
            contentFit="contain"
            style={[
              styles.image,
              {
                aspectRatio:
                  actualImageDimension.width / actualImageDimension.height,
                maxHeight: "100%",
              },
            ]}
            onLayout={(event) => {
              const { width, height, y } = event.nativeEvent.layout;
              setRenderedTopPadding(y);
              setScale({
                width: width / actualImageDimension.width,
                height: height / actualImageDimension.height,
              });
            }}
          />
        </View>
        {detectResult.map((det, index) => {
          const { x1, x2, y1, y2 } = det.box;
          const box = {
            x: x1 * scale.width,
            y: y1 * scale.height,
            width: (x2 - x1) * scale.width,
            height: (y2 - y1) * scale.height,
          };
          return (
            <View
              key={index}
              style={[
                {
                  position: "absolute",
                  borderWidth: 2,
                  borderColor: "red",
                  left: box.x,
                  top: box.y + renderedTopPadding,
                  width: box.width,
                  height: box.height,
                },
              ]}
            >
              <Text
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 12,
                  paddingHorizontal: 4,
                  paddingVertical: 1,
                }}
              >
                {`${det.name} (${(det.confidence * 100).toFixed(1)}%)`}
              </Text>
            </View>
          );
        })}
        <Button
          mode="contained"
          style={styles.detectButton}
          onPress={detectObject}
          loading={isLoading}
          disabled={isLoading}
        >
          {t("DETECT_OBJECT")}
        </Button>
      </View>
      <CustomModal
        visible={isEmptyModalVisible}
        onDismiss={() => setIsEmptyModalVisible(false)}
        onAction={onRetry}
        actionTitle={
          originScreen === "camera"
            ? t("CAPTURE_AGAIN")
            : t("SELECT_DIFFERENT_PHOTO")
        }
        title={t("NO_OBJECTS_DETECTED")}
        description={
          originScreen === "camera"
            ? t("CAMERA_RETRY_SUGGESTION")
            : t("GALLERY_RETRY_SUGGESTION")
        }
        Icon={
          <MaterialCommunityIcons name="alert-circle" size={50} color="red" />
        }
      />
    </>
  );
};

export default Preview;

const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
  },
  detectButton: {
    width: "50%",
  },
});
