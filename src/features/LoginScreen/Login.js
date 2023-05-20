import React from "react";
import MainContainer from "../../shared/components/MainContainer";
import { Alert, StyleSheet, View } from "react-native";
import FormInput from "../../shared/components/FormInput";
import FormButton from "../../shared/components/FormButton";
import { useTheme } from "../../shared/context/ThemeContext";
import FormPassword from "../../shared/components/FormPassword";
import AnimatedLottieView from "lottie-react-native";

const Login = ({ navigation }) => {
  const theme = useTheme();
  const styles = styling(theme);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    const usernameValid = "admin";
    const passValid = "admin123";
    if (usernameValid == username && passValid == password) {
      navigation.replace("Home");
    } else {
      Alert.alert("Incorrect Login Username or Password");
    }
  };

  return (
    <MainContainer>
      <View style={styles.text}>
        <AnimatedLottieView
          autoPlay={true}
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../../../assets/images/100920-login.json")}
        />
        <FormInput
          value={username}
          onChangeValue={setUsername}
          placeholder={"Input Your Username"}
        />
        <FormPassword
          value={password}
          onChangeValue={setPassword}
          placeholder={"Input Your Password"}
        />
      </View>
      <FormButton style={styles.button} label="Login" onClick={onSubmit} />
    </MainContainer>
  );
};

const styling = () =>
  StyleSheet.create({
    text: {
      alignItems: "center",
    },
    button: {
      width: "50%",
    },
  });

export default Login;
