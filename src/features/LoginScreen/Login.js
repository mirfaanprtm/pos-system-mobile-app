import React from "react";
import MainContainer from "../../shared/components/MainContainer";
import { Alert, StyleSheet, View } from "react-native";
import FormInput from "../../shared/components/FormInput";
import FormButton from "../../shared/components/FormButton";
import { useTheme } from "../../shared/context/ThemeContext";
import FormPassword from "../../shared/components/FormPassword";
import AnimatedLottieView from "lottie-react-native";
import { UserLogin } from "../../config/UserLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const theme = useTheme();
  const styles = styling(theme);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const onSubmit = () => {
    if (username !== "" && password !== "") {
    UserLogin({
      username: username.toLocaleLowerCase(),
      password: password,
    })
      .then((result) => {
        console.log(result);
        if (result?.status == 200) {
          AsyncStorage.setItem("AccessToken", result.data.data);
          navigation.replace("Home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
          onChangeValue={handleUsernameChange}
          placeholder={"Input Username"}
        />
        <FormPassword
          value={password}
          onChangeValue={handlePasswordChange}
          placeholder={"Input Password"}
        />
      </View>
      <FormButton style={styles.button} label="Login" onClick={onSubmit}/>
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
