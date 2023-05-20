import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const FormButton = ({ label, onClick }) => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.color.primary,
      borderRadius: theme.radius.l,
      margin: theme.spacing.l,
      padding: theme.spacing.m,
    },
    buttonText: {
      color: theme.color.ternary,
      fontFamily: "Montserrat-Medium",
    },
  });

export default FormButton;