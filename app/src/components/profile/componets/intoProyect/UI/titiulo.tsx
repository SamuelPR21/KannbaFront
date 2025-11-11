import React from "react";
import { Text, View } from "react-native";

export default function Titulo({ title, categoria }: { title: string; categoria: string }) {
  return (
    <View className="bg-blue-100 rounded-2xl p-4 mb-8 shadow-md">
      <Text className="text-4xl font-extrabold text-center text-blue-900 tracking-wide mb-2">
        {title}
      </Text>

      <View className="h-1 w-16 bg-blue-500 self-center rounded-full mb-3" />

      <Text className="text-lg font-semibold text-center text-blue-600 uppercase">
        {categoria}
      </Text>
    </View>
  );
}
