import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatGrid } from "react-native-super-grid";
import TextLabel from "../../shared/components/TextLabel";
import theme from "../../shared/constants/theme";
import TransactionScreen from "./components/TransactionComp";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StockContext, StockProvider } from "../../shared/context/StockContext";

function DashboardScreen() {
  const theme = useTheme();
  const styles = styling(theme);
  const [totalStockIn, setTotalStockIn] = useState(0);
  const { totStockIn } = useContext(StockContext);

  useEffect(() => {
    const calculateTotalStockIn = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem("AccessToken");
        const response = await axios.get(
          "http://10.10.100.46:8080/api/trx/stock-in",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = response.data.data;

        // Hitung total produk masuk dari data yang diperoleh
        const total = data.reduce((acc, item) => acc + item.qty, 0);
        setTotalStockIn(total);
      } catch (error) {
        console.error(error);
      }
    };

    calculateTotalStockIn();
  }, []);

  const data = [
    { id: 1, h1: totalStockIn.toString(), h2: "Product In" },
    { id: 2, h1: "104", h2: "Product Out" },
  ];

  const renderItem = ({ item }) => {
    let itemStyle = styles.itemContainer;

    if (item.id === 1) {
      itemStyle = [styles.itemContainer, { backgroundColor: "#0080F6" }];
    } else if (item.id === 2) {
      itemStyle = [styles.itemContainer, { backgroundColor: "#00B2EB" }];
    }

    return (
      <View>
        <TouchableOpacity style={itemStyle}>
          <View style={styles.textContainer}>
            <TextLabel text={item.h1} label={"h2"} />
            <TextLabel text={item.h2} label={"h2"} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style={styles.statBar} barStyle={"light-content"} />
      <View style={{ flex: 1, margin: 20 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 50 }}
          source={require("../../../assets/images/profil.jpeg")}
        />
        <Text style={styles.textHello}>Hi, Admin!</Text>
        <FlatGrid
          style={{ flex: 1 }}
          itemDimension={130}
          data={data}
          renderItem={renderItem}
        />
    
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <StockProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Stock In") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: "#1D267D",
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Stock In" component={TransactionScreen} />
      </Tab.Navigator>
    </StockProvider>
  );
};

const styling = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F6F4",
    },
    statBar: {
      backgroundColor: "#F8F6F4",
    },
    itemContainer: {
      height: 130,
      borderRadius: 20,
      elevation: 3,
      marginTop: 120,
      display: "flex",
      flexDirection: "column"
    },
    sectionContainer: {
      alignItems: "stretch",
      gap: 30,
      display: "flex",
      margin: 10,
      marginBottom: 200,
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flex: 1,
    },
    textHello: {
      fontFamily: "Montserrat-Medium",
      color: theme.color.primary,
      fontWeight: "bold",
      marginTop: 10,
    },
  });

export default Dashboard;
