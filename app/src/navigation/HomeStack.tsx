import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTablero from "../components/home/components/Proyecto/homeProyecto";
import HomeProyecto from "../components/home/components/Tablero/homeTablero";

export type HomeStackParamList = {
  HomeTablero: undefined;
  HomeProyecto: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTablero" component={HomeTablero} />
      <Stack.Screen name="HomeProyecto" component={HomeProyecto} />
    </Stack.Navigator>
  );
}