import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center px-6 py-3 bg-blue-100 border-t border-blue-300">
      {/* Botón de perfil */}
      <TouchableOpacity
        onPress={() => router.push("../home/profile")}
        className="border border-blue-600 rounded-full px-4 py-1"
      >
        <Text className="text-blue-700 font-medium">Profile</Text>
      </TouchableOpacity>

      {/* Botón Home con ícono */}
      <TouchableOpacity
        onPress={() => router.push("../home")}
        className="items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-md"
      >
        <Ionicons name="home-outline" size={26} color="white" />
      </TouchableOpacity>

      {/* Botón de Logout */}
      <TouchableOpacity
        onPress={() => router.replace("../login")}
        className="border border-blue-600 rounded px-4 py-1"
      >
        <Text className="text-blue-700 font-medium">Logout →</Text>
      </TouchableOpacity>
    </View>
  );
}
