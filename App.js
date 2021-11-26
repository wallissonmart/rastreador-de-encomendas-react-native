import React, { useState, useEffect, AsyncStorage } from "react";
import { Text, View, Button, Alert } from "react-native";
import { css } from "./assets/css/Css";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Login, Rastreio } from "./views";
import AreaRestrita from "./views/arearestrita/AreaRestrita";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "WALLMART",
            headerStyle: { backgroundColor: "gray" },
            headerTintColor: "black",
            headerTitleStyle: { fontWeight: "bold", alignSelf: "center" }
          }}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen
          name="AreaRestrita"
          options={{ headerShown: false }}
          component={AreaRestrita}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
