import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LogoutBtnProps {
  onLogout: () => void;
}

export default function LogoutBtn({ onLogout }: LogoutBtnProps) {
  return (
    <TouchableOpacity
      onPress={onLogout}
      // Estilo para separarlo de la lista y darle color de advertencia
      className="flex-row items-center justify-center p-3 mt-8 mb-4 bg-red-600 rounded-lg shadow-md"
    >
      <MaterialCommunityIcons name="logout" size={20} color="white" />
      <Text className="text-white font-semibold text-lg ml-3">
        Cerrar Sesión
      </Text>
    </TouchableOpacity>
  );
}