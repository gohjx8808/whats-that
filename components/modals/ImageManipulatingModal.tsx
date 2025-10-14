import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Modal, Text, useTheme } from "react-native-paper";

interface ImageManipulatingModalProps {
  visible: boolean;
}

const ImageManipulatingModal = (props: ImageManipulatingModalProps) => {
  const { visible } = props;

  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      dismissable={false}
      contentContainerStyle={[
        { backgroundColor: colors.background },
        styles.container,
      ]}
    >
      <ActivityIndicator size="large" />
      <Text variant="titleLarge" style={styles.title}>
        {t("IMAGE_PROCESSING")}
      </Text>
    </Modal>
  );
};

export default ImageManipulatingModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    gap: 20,
  },
  title: {
    textAlign: "center",
  },
});
