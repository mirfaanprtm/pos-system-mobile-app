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

function DashboardScreen() {
  const theme = useTheme();
  const styles = styling(theme);
  const data = [{ id: 1 }, { id: 2 }];

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
          <TextLabel text={"3027"} label={"h2"} />
          <TextLabel text={"Product In"} label={"h3"} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style={styles.statBar} barStyle={"light-content"} />
      <View style={{ flex: 1, margin: 20 }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={require("../../../assets/images/profil.jpeg")}
        />
        <Text>Hi, Cucu!</Text>
        <Text>Welcome to Dashboard</Text>
        <FlatGrid
          style={{ flex: 1 }}
          itemDimension={130}
          data={data}
          renderItem={renderItem}
        />
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={{ backgroundColor: "#0080F6", borderRadius: 5, padding: 20 }}
          >
            <TextLabel text={"Profit/day"} label={"h2"} />
            <TextLabel text={"Rp. 200.000,-"} label={"h2"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#00B2EB", borderRadius: 5, padding: 20 }}
          >
            <TextLabel text={"Total Product Out/day"} label={"h2"} />
            <TextLabel text={"120"} label={"h2"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function TransactionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Transaction</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const theme = useTheme();
  const styles = styling(theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Transaction") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
    </Tab.Navigator>
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
      borderRadius: 10,
      elevation: 3,
    },
    sectionContainer: {
      alignItems: "stretch",
      gap: 30,
      marginTop: -100,
    },
  });

export default Dashboard;
