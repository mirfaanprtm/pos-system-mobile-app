import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const MainContainer = ({ children }) => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>{children}</View>
      <StatusBar style="auto" />
    </View>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.color.white,
      justifyContent: "flex-start",
    },
    childrenContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });

export default MainContainer;
