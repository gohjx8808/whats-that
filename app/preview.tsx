import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import {
  SSDLITE_320_MOBILENET_V3_LARGE,
  useObjectDetection,
} from "react-native-executorch";
import { Appbar, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Preview = () => {
  const params = useLocalSearchParams<{ imageUrl: string }>();
  const ssdLite = useObjectDetection({
    modelSource: SSDLITE_320_MOBILENET_V3_LARGE,
  });

  const { bottom } = useSafeAreaInsets();

  const detectObject = async () => {
    const detection = await ssdLite.forward(params.imageUrl);
    console.log(detection);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Preview and Detection" />
      </Appbar.Header>
      <View style={[styles.contentContainer, { paddingBottom: bottom }]}>
        <Image
          source={params.imageUrl}
          contentFit="contain"
          style={styles.image}
        />
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
    flex: 1,
    width: "100%",
  },
  detectButton: {
    width: "50%",
  },
});
