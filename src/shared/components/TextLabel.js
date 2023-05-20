import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const TextLabel = ({ text, label }) => {
  const theme = useTheme();

  return <Text style={theme.text[`${label}style`]}>{text}</Text>;
};

export default TextLabel;
