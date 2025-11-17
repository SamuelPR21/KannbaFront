import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface AddProjectButtonProps {
  onPress?: () => void;
}

export default function AddProjectButton({ onPress }: AddProjectButtonProps) {
  return (
    <TouchableOpacity
      className="bg-blue-500 rounded-lg p-3 my-4"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-center">+ Añadir Proyecto</Text>
    </TouchableOpacity>
  );
}