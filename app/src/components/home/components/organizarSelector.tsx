// src/components/home/components/organizarSelector.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  organizarPor: "Personal" | "Proyecto";
  opciones: string[];
  onSelect: (value: string) => void;
}

export default function OrganizarSelector({
  organizarPor,
  opciones,
  onSelect,
}: Props) {
  return (
    <View className="mt-4">
      <Text className="text-xs text-slate-500 mb-1">Vista</Text>

      <View className="flex-row bg-white rounded-full border border-blue-200 overflow-hidden shadow-sm">
        {opciones.map((opt) => {
          const isActive = opt === organizarPor;
          return (
            <TouchableOpacity
              key={opt}
              className={`flex-1 py-2 items-center ${
                isActive ? "bg-blue-700" : "bg-transparent"
              }`}
              onPress={() => onSelect(opt)}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? "text-white" : "text-blue-700"
                }`}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
