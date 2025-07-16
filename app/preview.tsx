import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  SSDLITE_320_MOBILENET_V3_LARGE,
  useObjectDetection,
} from "react-native-executorch";

const Preview = () => {
  const params = useLocalSearchParams<{ imageUrl: string }>();
  const ssdLite = useObjectDetection({
    modelSource: SSDLITE_320_MOBILENET_V3_LARGE,
  });

  useEffect(() => {
    const detect = async () => {
      const detection = await ssdLite.forward(params.imageUrl);
    };

    detect();
  }, [params.imageUrl, ssdLite]);

  return (
      <Image source={params.imageUrl} style={{ flex: 1, width: "100%" }} />
  );
};

export default Preview;
