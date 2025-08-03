import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import {
  SSDLITE_320_MOBILENET_V3_LARGE,
  useObjectDetection,
} from "react-native-executorch";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Preview = () => {
  const params = useLocalSearchParams<{ imageUrl: string }>();
  const ssdLite = useObjectDetection({
    modelSource: SSDLITE_320_MOBILENET_V3_LARGE,
  });

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const detect = async () => {
      const detection = await ssdLite.forward(params.imageUrl);
    };

    detect();
  }, [params.imageUrl, ssdLite]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Preview and Detection" />
      </Appbar.Header>
      <View style={{ margin: 20, flex: 1, paddingBottom: bottom }}>
        <Image source={params.imageUrl} style={{ flex: 1, width: "100%" }} />
      </View>
    </>
  );
};

export default Preview;
