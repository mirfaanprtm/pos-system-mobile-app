import { useFonts } from "expo-font";

const useAppFont = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
  });

  return fontsLoaded;
};

export default useAppFont;
