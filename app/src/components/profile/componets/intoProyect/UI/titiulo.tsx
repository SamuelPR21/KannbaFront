import React from "react";
import { Text, View } from "react-native";

interface TituloProps {
    title?: string;
    categoria?: string;
  }

export default function Titulo({ title, categoria }: TituloProps) {
    const mostrarLinea = title && categoria;  
    
    return (

    <View className="bg-blue-100 rounded-2xl p-4 mb-8 shadow-md">
      <Text className="text-4xl font-extrabold text-center text-blie-900 tracking-wide mb-2">
        {title}
      </Text>

      <View className="h-1 w-16 bg-blue-500 self-center rounded-full mb-3" />

      <Text className="text-lg font-semibold text-center text-blue-600 uppercase">
        {categoria}
      </Text>
    </View>
  );
}                               