import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";

export default function Logout() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        ¿Deseas cerrar sesión?
      </Text>

      <TouchableOpacity
        className="bg-red-600 rounded-lg p-4 px-8"
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-base">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
