import { View, StyleSheet } from "react-native";
import TextLabel from "../../shared/components/TextLabel";
import FormButton from "../../shared/components/FormButton";
import { useTheme } from "../../shared/context/ThemeContext";
import AnimatedLottieView from "lottie-react-native";

const Welcome = ({navigation}) => {
  const theme = useTheme();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay={true}
        style={styles.animate}
        source={require("../../../assets/images/113159-point-of-sale.json")}
      />
      <View style={styles.titleContainer}>
        <TextLabel text={"POS Mobile"} label={"h1"} />
        <TextLabel text={"Point Of Sales"} label={"h3"} />
      </View>
      <FormButton label="Next" onClick={() => navigation.navigate('Login')} />
    </View>
  );
};

const styling = () =>
  StyleSheet.create({
    titleContainer: {
      alignItems: "center",
    },
    animate: {
      width: 400,
      height: 300,
      alignSelf: "center",
    },
    container: {
      // display: "flex",
      // justifyContent: "flex-end",
      // flexDirection: "column",
      // alignContent: "center"
      marginTop: "50%",
    }
  });

export default Welcome