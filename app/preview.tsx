import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image as RNImage, ImageSize } from "react-native";
import {
  Detection,
  SSDLITE_320_MOBILENET_V3_LARGE,
  useObjectDetection,
} from "react-native-executorch";
import { Appbar, Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Preview = () => {
  const params = useLocalSearchParams<{ imageUrl: string }>();
  const test =
    "https://i.guim.co.uk/img/media/327aa3f0c3b8e40ab03b4ae80319064e401c6fbc/377_133_3542_2834/master/3542.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=34d32522f47e4a67286f9894fc81c863";
  const ssdLite = useObjectDetection({
    modelSource: SSDLITE_320_MOBILENET_V3_LARGE,
  });

  const [scale, setScale] = useState({ height: 0, width: 0 });
  const [detectResult, setDetectResult] = useState<Detection[]>([]);
  const [renderedTopPadding, setRenderedTopPadding] = useState(0);
  const [actualImageDimension, setActualImageDimension] = useState<ImageSize>({
    height: 0,
    width: 0,
  });

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const getImageDimension = async () => {
      const dimension = await RNImage.getSize(test);
      setActualImageDimension(dimension);
    };
    getImageDimension();
  }, []);

  const detectObject = async () => {
    const detection = await ssdLite.forward(test);
    setDetectResult(detection);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Preview and Detection" />
      </Appbar.Header>
      <View style={[styles.contentContainer, { paddingBottom: bottom }]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={test}
            contentFit="contain"
            style={[
              styles.image,
              {
                aspectRatio:
                  actualImageDimension.width / actualImageDimension.height,
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
          const { x1, x2, y1, y2 } = det.bbox;
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
                {`${det.label} (${(det.score * 100).toFixed(1)}%)`}
              </Text>
            </View>
          );
        })}
        <Button
          mode="contained"
          style={styles.detectButton}
          onPress={detectObject}
        >
          Detect Object
        </Button>
      </View>
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
