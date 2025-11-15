import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  onLogout: () => void;
}

export default function LogoutBtn({ onLogout }: Props) {
  return (
    <TouchableOpacity
      onPress={onLogout}
      className="flex-row items-center justify-center p-3 mt-4 mb-6 bg-red-600 rounded-lg"
    >
      <Text className="text-white font-semibold text-lg">Cerrar sesión</Text>
    </TouchableOpacity>
  );
}