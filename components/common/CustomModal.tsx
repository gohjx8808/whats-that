import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

interface CustomModalProps {
  visible: boolean;
  title: string;
  description: string;
  onDismiss: () => void;
  onAction?: () => void;
  actionTitle?: string;
  Icon?: React.ReactElement;
}

const CustomModal = (props: CustomModalProps) => {
  const {
    visible,
    title,
    description,
    onDismiss,
    onAction,
    actionTitle,
    Icon,
  } = props;

  const { colors } = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={[
          { backgroundColor: colors.background },
          styles.container,
        ]}
        onDismiss={onDismiss}
      >
        {Icon}
        <View style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.title}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {description}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {onAction && actionTitle && (
            <Button onPress={onAction} mode="contained">
              {actionTitle}
            </Button>
          )}
          <Button onPress={onDismiss}>Close</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    margin: 32,
    padding: 20,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    gap: 20,
  },
  textContainer: {
    gap: 5,
    alignItems: "center",
  },
  buttonContainer: {
    gap: 5,
    minWidth: "60%",
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
  },
});
