import React, { useState } from "react";
import useAppFont from "./src/shared/hooks/useAppFont";
import { ThemeProvider } from "./src/shared/context/ThemeContext";
import Welcome from "./src/features/WelcomeScreen/Welcome";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/features/LoginScreen/Login";

import Dashboard from "./src/features/DashboardScreen/Dashboard";
import AddTransaction from "./src/features/DashboardScreen/components/AddTransaction";

export default function App() {
  const fonts = useAppFont();
  if (!fonts) {
    return null;
  }

  const Stack = createStackNavigator();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerMode: "none",
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={Dashboard}
            options={{
              title: () => null,
              headerLeft: () => null,
              headerMode: "none",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
