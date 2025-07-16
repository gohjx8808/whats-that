import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

const GeneralView = (props: ViewProps) => {
  const { colors } = useTheme();
  const { children, style, ...remainingProps } = props;

  return (
    <View
      {...remainingProps}
      style={[{ backgroundColor: colors.background,flex:1 }, style]}
    >
      {children}
    </View>
  );
};

export default GeneralView;
