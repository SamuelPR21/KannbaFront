// src/footer/footer.tsx
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Home from "../components/home/mainHome";
import Pet from "../components/Pet/mainPet";
import Profile from "../components/profile/profile";
import { TabParamList } from "../navigation/types";

const Tab = createBottomTabNavigator<TabParamList>();

export default function Footer() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        // 🎨 Íconos activos e inactivos
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "#9CA3AF",

        // 📌 Altura + padding idénticos a tu footer actual
        tabBarStyle: {
          height: 62,
          paddingBottom: 6,
          paddingTop: 4,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 15,
          shadowColor: "#000",
          shadowOpacity: 0.18,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: -3 },
        },

        // 👇 Esto es clave para que NO se pegue al borde del celular
        tabBarItemStyle: {
          paddingBottom: 4,
        },

        // Texto debajo de icono
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -2,
        },

        // 🐾 Iconos
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Home") {
            return (
              <MaterialIcons
                name="dashboard"
                size={22}
                color={color}
              />
            );
          }

          if (route.name === "Profile") {
            return (
              <MaterialCommunityIcons
                name={focused ? "account-circle" : "account-circle-outline"}
                size={22}
                color={color}
              />
            );
          }

          if (route.name === "Pet") {
            return (
              <MaterialCommunityIcons
                name="cat"
                size={22}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
      <Tab.Screen name="Pet" component={Pet} options={{ title: "Pet" }} />
    </Tab.Navigator>
  );
}
