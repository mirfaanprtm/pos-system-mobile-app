import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Entypo } from "@expo/vector-icons";

const FormPassword = ({ value, onChangeValue, placeholder }) => {
  const theme = useTheme();
  const styles = styling(theme);
  const [hidePass, setHidePass] = React.useState(true);

  return (
    <View style={styles.passwordInput}>
      <TextInput
        secureTextEntry={hidePass}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        style={{ fontFamily: "Montserrat-Regular" }}
      />
      <Pressable onPress={() => setHidePass(!hidePass)}>
        <Entypo
          name={hidePass ? "eye-with-line" : "eye"}
          size={24}
          color={"black"}
        />
      </Pressable>
    </View>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    passwordInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontFamily: "Montserrat-Regular",
      borderColor: theme.color.primary,
      width: 300,
      height: 50,
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.radius.m,
      padding: theme.spacing.sm,
      margin: theme.spacing.m,
      backgroundColor: theme.color.transparent,
    },
  });

export default FormPassword;
