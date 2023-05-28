import { TextInput } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { StyleSheet } from "react-native";

const Dropdown = ({
  value,
  onChangeValue,
  placeholder = "",
  keyboard = "default",
}) => {
  const theme = useTheme();
  const styles = styling(theme);
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeValue}
      value={value}
      keyboardType={keyboard}
    />
  );
};

const styling = (theme) =>
  StyleSheet.create({
    input: {
      height: 50,
      marginHorizontal: theme.spacing.m,
      marginTop: theme.spacing.s,
      borderRadius: theme.radius.m,
      width: 300,
      borderColor: theme.color.primary,
      borderWidth: 1,
      padding: theme.spacing.sm,
      backgroundColor: theme.color.transparent,
      alignItems: "center",
      fontFamily: "Montserrat-Regular",
    },
  });

export default Dropdown;
